# HAProxy (xbox2)

Config for HAProxy on **xbox2** (192.168.222.202). Backends: webservers xbox3–xbox7 on port 40000.

## Deploy

Copy `haproxy.cfg` to the server and reload:

```bash
sudo cp haproxy.cfg /etc/haproxy/haproxy.cfg
sudo haproxy -c -f /etc/haproxy/haproxy.cfg   # config check
sudo systemctl reload haproxy
```

## Socket

Config uses:

- `stats socket /run/haproxy/admin.sock`

On some systems the path is `/var/run/haproxy/admin.sock` (symlink to `/run`). Use the path that exists on xbox2.

## Show backend status (hashow)

Source this on xbox2 (or add to `~/.bashrc`) to show backend server state. Socket path must match the server (e.g. `/run/haproxy/admin.sock` or `/var/run/haproxy/admin.sock`):

```bash
hashow() {
    echo "show servers state" | sudo socat stdio /run/haproxy/admin.sock | awk 'NR>2 { status = ($6 == 2) ? "UP" : "DOWN"; print "Server: " $4 " (" $5 "), Status: " status }'
}
```

If your socket is under `/var/run`, use:

```bash
hashow() {
    echo "show servers state" | sudo socat stdio /var/run/haproxy/admin.sock | awk 'NR>2 { status = ($6 == 2) ? "UP" : "DOWN"; print "Server: " $4 " (" $5 "), Status: " status }'
}
```

`$6 == 2` is the HAProxy server state (2 = running/UP). Run `hashow` a few seconds after reload so health checks have run; powered-off backends will show DOWN.
