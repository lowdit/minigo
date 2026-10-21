module github.com/lowdit/minigo/exampleSite

go 1.20

require github.com/lowdit/minigo v0.0.0-20261021090903-757fb0862298

// Build CI / local depuis la racine du dépôt : le thème = checkout courant.
replace github.com/lowdit/minigo => ../
