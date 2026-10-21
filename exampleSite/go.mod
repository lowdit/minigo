module github.com/lowdit/minigo/exampleSite

go 1.20

require github.com/lowdit/minigo v0.0.0-20261021091739-c103f5998d3d

// Build CI / local depuis la racine du dépôt : le thème = checkout courant.
replace github.com/lowdit/minigo => ../
