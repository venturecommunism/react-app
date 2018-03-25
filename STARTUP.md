MIX_ENV=prod PORT=4001 iex -S mix phoenix.server (for production)
MIX_ENV=dev PORT=443 elixir --detached -S mix phoenix.server (works for dev)

on ubuntu 14.04 move config/scripts/rihannad.conf, config/scripts/datomicd.conf and config/scripts/camlistored.conf to /etc/init and start these services

run config/scripts/certbot.sh and crontab -e to write a crontab to recertify every 2 months (since it expires every 90 days)
e.g.:
0 8 5 */2 * sudo certbot renew

