(ns datomic_utils.utils
  (:gen-class)
  (:require [clojure.core.async :as async :refer [<! >! <!! go close!]]
            [clojure-erlastic.core :refer [port-connection]]
            [clojure.core.match :refer [match]]
            [clojure.string :as string]
            [datomic.api :as datomic]
            [datomock.core :as datomock]
            [net.phobot.datomic.migrator :refer [run-migrations]]
            [net.phobot.datomic.seed :refer [transact-seed-data]]
  ))

(defn execcommand [& args]
  (let [[command db-name] args]

  (if (= command "show-dbs")
    (do
      (println (datomic/get-database-names "datomic:sql://*?jdbc:postgresql://localhost:5432/datomic?user=datomic&password=datomic"))
      (System/exit 0))
  )

  (if (nil? db-name)
    (do
      (println "missing second argument")
      (System/exit 0))
  )

  (if (and (= command "create-db"))
    (if (some #(= db-name %) (datomic/get-database-names "datomic:sql://*?jdbc:postgresql://localhost:5432/datomic?user=datomic&password=datomic"))
      (do
        (println (str "Database: " db-name " already exists so can't create it"))
        (System/exit 0))
      (do
        (println (str "Creating database: " db-name "..."))
        (datomic/create-database (str "datomic:sql://" db-name "?jdbc:postgresql://localhost:5432/datomic?user=datomic&password=datomic"))
        (System/exit 0))
  ))


  (if (and (= command "drop-db"))
    (if (some #(= db-name %) (datomic/get-database-names "datomic:sql://*?jdbc:postgresql://localhost:5432/datomic?user=datomic&password=datomic"))
      (do
        (println (str "Are you sure you want to permanently delete database: " db-name "? This operation is irreversible."))
        (let [yesnoinput (read-line)]
          (if (or
                (= yesnoinput "Y")
                (= yesnoinput "y")
                (= yesnoinput "Yes")
                (= yesnoinput "yes"))
            (do
              (println (str "Deleting database: " db-name "..."))
              (datomic/delete-database (str "datomic:sql://" db-name "?jdbc:postgresql://localhost:5432/datomic?user=datomic&password=datomic"))
              (println (str "Deleted database: datomic:sql://" db-name "?jdbc:postgresql://localhost:5432/datomic?user=datomic&password=datomic"))
              (System/exit 0))
            (do
              (println "Aborting database deletion.")
              (System/exit 0)))))
      (do
        (println "Database doesn't exist so we can't drop it")
        (System/exit 0))
  ))




  )
)

(defn -main [& args]
  (if
    (or
      (= (nth args 0) "show-dbs")
      (= (nth args 0) "create-db")
      (= (nth args 0) "drop-db"))
    (do
      (apply execcommand args))
    (do
      (println "First argument is invalid or missing")
      (System/exit 0)))
)
