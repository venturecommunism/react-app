(defproject datomic_utils/utils "0.0.1"
  :description "Datomic utilities for Elixir"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/core.async "0.2.374"]
                 [org.clojure/core.match "0.3.0-alpha4"]
                 [clojure-erlastic "0.3.1"]
;                [com.datomic/datomic-free "0.9.5544"]
                 [com.datomic/datomic-pro "0.9.5656"]
                 [org.postgresql/postgresql "9.3-1102-jdbc41"]
                 [vvvvalvalval/datomock "0.1.0"]
;                 [net.phobot.datomic/seed "3.0.0"]
                ]
;  :repositories {"my.datomic.com" {:url "https://my.datomic.com/repo"
;                                   :creds :gpg}}
  :main datomic_utils.utils
  :aot :all)

; If you are using Datomic Pro, the repository above will be necessary and you'll
; need your credentials for it. You'll need to install gpg for this.
; 
; First write your credentials map to ~/.lein/credentials.clj like so:
; 
;   {#"my\.datomic\.com" {:username "[USERNAME]"
;                         :password "[LICENSE_KEY]"}}
; Then encrypt it with gpg:
; 
;   $ gpg --default-recipient-self -e ~/.lein/credentials.clj > ~/.lein/credentials.clj.gpg
;
; Remember to delete the plaintext credentials.clj once you've encrypted it.
