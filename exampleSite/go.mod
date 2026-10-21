module github.com/lowdit/minigo/exampleSite

go 1.20

require github.com/lowdit/minigo v0.0.0-20261021091104-26827336ca0d

// Build CI / local depuis la racine du dépôt : le thème = checkout courant.
replace github.com/lowdit/minigo => ../
