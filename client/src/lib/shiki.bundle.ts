/* Generate by @shikijs/codegen */
import type {
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  HighlighterGeneric,
} from '@shikijs/types'
import {
  createBundledHighlighter,
  createSingletonShorthands,
} from '@shikijs/core'
import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript'

type BundledLanguage =
  | 'abap'
  | 'actionscript-3'
  | 'ada'
  | 'angular-html'
  | 'angular-ts'
  | 'apache'
  | 'apex'
  | 'apl'
  | 'applescript'
  | 'ara'
  | 'asciidoc'
  | 'adoc'
  | 'asm'
  | 'astro'
  | 'awk'
  | 'ballerina'
  | 'bat'
  | 'batch'
  | 'beancount'
  | 'berry'
  | 'be'
  | 'bibtex'
  | 'bicep'
  | 'blade'
  | 'bsl'
  | '1c'
  | 'c'
  | 'cadence'
  | 'cdc'
  | 'cairo'
  | 'clarity'
  | 'clojure'
  | 'clj'
  | 'cmake'
  | 'cobol'
  | 'codeowners'
  | 'codeql'
  | 'ql'
  | 'coffee'
  | 'coffeescript'
  | 'common-lisp'
  | 'lisp'
  | 'coq'
  | 'cpp'
  | 'c++'
  | 'crystal'
  | 'csharp'
  | 'c#'
  | 'cs'
  | 'css'
  | 'csv'
  | 'cue'
  | 'cypher'
  | 'cql'
  | 'd'
  | 'dart'
  | 'dax'
  | 'desktop'
  | 'diff'
  | 'docker'
  | 'dockerfile'
  | 'dotenv'
  | 'dream-maker'
  | 'edge'
  | 'elixir'
  | 'elm'
  | 'emacs-lisp'
  | 'elisp'
  | 'erb'
  | 'erlang'
  | 'erl'
  | 'fennel'
  | 'fish'
  | 'fluent'
  | 'ftl'
  | 'fortran-fixed-form'
  | 'f'
  | 'for'
  | 'f77'
  | 'fortran-free-form'
  | 'f90'
  | 'f95'
  | 'f03'
  | 'f08'
  | 'f18'
  | 'fsharp'
  | 'f#'
  | 'fs'
  | 'gdresource'
  | 'gdscript'
  | 'gdshader'
  | 'genie'
  | 'gherkin'
  | 'git-commit'
  | 'git-rebase'
  | 'gleam'
  | 'glimmer-js'
  | 'gjs'
  | 'glimmer-ts'
  | 'gts'
  | 'glsl'
  | 'gnuplot'
  | 'go'
  | 'graphql'
  | 'gql'
  | 'groovy'
  | 'hack'
  | 'haml'
  | 'handlebars'
  | 'hbs'
  | 'haskell'
  | 'hs'
  | 'haxe'
  | 'hcl'
  | 'hjson'
  | 'hlsl'
  | 'html'
  | 'html-derivative'
  | 'http'
  | 'hurl'
  | 'hxml'
  | 'hy'
  | 'imba'
  | 'ini'
  | 'properties'
  | 'java'
  | 'javascript'
  | 'js'
  | 'cjs'
  | 'mjs'
  | 'jinja'
  | 'jison'
  | 'json'
  | 'json5'
  | 'jsonc'
  | 'jsonl'
  | 'jsonnet'
  | 'jssm'
  | 'fsl'
  | 'jsx'
  | 'julia'
  | 'jl'
  | 'kdl'
  | 'kotlin'
  | 'kt'
  | 'kts'
  | 'kusto'
  | 'kql'
  | 'latex'
  | 'lean'
  | 'lean4'
  | 'less'
  | 'liquid'
  | 'llvm'
  | 'log'
  | 'logo'
  | 'lua'
  | 'luau'
  | 'make'
  | 'makefile'
  | 'markdown'
  | 'md'
  | 'marko'
  | 'matlab'
  | 'mdc'
  | 'mdx'
  | 'mermaid'
  | 'mmd'
  | 'mipsasm'
  | 'mips'
  | 'mojo'
  | 'move'
  | 'narrat'
  | 'nar'
  | 'nextflow'
  | 'nf'
  | 'nginx'
  | 'nim'
  | 'nix'
  | 'nushell'
  | 'nu'
  | 'objective-c'
  | 'objc'
  | 'objective-cpp'
  | 'ocaml'
  | 'openscad'
  | 'scad'
  | 'pascal'
  | 'perl'
  | 'php'
  | 'pkl'
  | 'plsql'
  | 'po'
  | 'pot'
  | 'potx'
  | 'polar'
  | 'postcss'
  | 'powerquery'
  | 'powershell'
  | 'ps'
  | 'ps1'
  | 'prisma'
  | 'prolog'
  | 'proto'
  | 'protobuf'
  | 'pug'
  | 'jade'
  | 'puppet'
  | 'purescript'
  | 'python'
  | 'py'
  | 'qml'
  | 'qmldir'
  | 'qss'
  | 'r'
  | 'racket'
  | 'raku'
  | 'perl6'
  | 'razor'
  | 'reg'
  | 'regexp'
  | 'regex'
  | 'rel'
  | 'riscv'
  | 'rosmsg'
  | 'rst'
  | 'ruby'
  | 'rb'
  | 'rust'
  | 'rs'
  | 'sas'
  | 'sass'
  | 'scala'
  | 'scheme'
  | 'scss'
  | 'sdbl'
  | '1c-query'
  | 'shaderlab'
  | 'shader'
  | 'shellscript'
  | 'bash'
  | 'sh'
  | 'shell'
  | 'zsh'
  | 'shellsession'
  | 'console'
  | 'smalltalk'
  | 'solidity'
  | 'soy'
  | 'closure-templates'
  | 'sparql'
  | 'splunk'
  | 'spl'
  | 'sql'
  | 'ssh-config'
  | 'stata'
  | 'stylus'
  | 'styl'
  | 'svelte'
  | 'swift'
  | 'system-verilog'
  | 'systemd'
  | 'talonscript'
  | 'talon'
  | 'tasl'
  | 'tcl'
  | 'templ'
  | 'terraform'
  | 'tf'
  | 'tfvars'
  | 'tex'
  | 'toml'
  | 'ts-tags'
  | 'lit'
  | 'tsv'
  | 'tsx'
  | 'turtle'
  | 'twig'
  | 'typescript'
  | 'ts'
  | 'cts'
  | 'mts'
  | 'typespec'
  | 'tsp'
  | 'typst'
  | 'typ'
  | 'v'
  | 'vala'
  | 'vb'
  | 'cmd'
  | 'verilog'
  | 'vhdl'
  | 'viml'
  | 'vim'
  | 'vimscript'
  | 'vue'
  | 'vue-html'
  | 'vue-vine'
  | 'vyper'
  | 'vy'
  | 'wasm'
  | 'wenyan'
  | '文言'
  | 'wgsl'
  | 'wikitext'
  | 'mediawiki'
  | 'wiki'
  | 'wit'
  | 'wolfram'
  | 'wl'
  | 'xml'
  | 'xsl'
  | 'yaml'
  | 'yml'
  | 'zenscript'
  | 'zig'
type BundledTheme = 'tokyo-night'
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const bundledLanguages = {
  abap: () => import('@shikijs/langs-precompiled/abap'),
  'actionscript-3': () => import('@shikijs/langs-precompiled/actionscript-3'),
  ada: () => import('@shikijs/langs-precompiled/ada'),
  'angular-html': () => import('@shikijs/langs-precompiled/angular-html'),
  'angular-ts': () => import('@shikijs/langs-precompiled/angular-ts'),
  apache: () => import('@shikijs/langs-precompiled/apache'),
  apex: () => import('@shikijs/langs-precompiled/apex'),
  apl: () => import('@shikijs/langs-precompiled/apl'),
  applescript: () => import('@shikijs/langs-precompiled/applescript'),
  ara: () => import('@shikijs/langs-precompiled/ara'),
  asciidoc: () => import('@shikijs/langs-precompiled/asciidoc'),
  adoc: () => import('@shikijs/langs-precompiled/asciidoc'),
  asm: () => import('@shikijs/langs-precompiled/asm'),
  astro: () => import('@shikijs/langs-precompiled/astro'),
  awk: () => import('@shikijs/langs-precompiled/awk'),
  ballerina: () => import('@shikijs/langs-precompiled/ballerina'),
  bat: () => import('@shikijs/langs-precompiled/bat'),
  batch: () => import('@shikijs/langs-precompiled/bat'),
  beancount: () => import('@shikijs/langs-precompiled/beancount'),
  berry: () => import('@shikijs/langs-precompiled/berry'),
  be: () => import('@shikijs/langs-precompiled/berry'),
  bibtex: () => import('@shikijs/langs-precompiled/bibtex'),
  bicep: () => import('@shikijs/langs-precompiled/bicep'),
  blade: () => import('@shikijs/langs-precompiled/blade'),
  bsl: () => import('@shikijs/langs-precompiled/bsl'),
  '1c': () => import('@shikijs/langs-precompiled/bsl'),
  c: () => import('@shikijs/langs-precompiled/c'),
  cadence: () => import('@shikijs/langs-precompiled/cadence'),
  cdc: () => import('@shikijs/langs-precompiled/cadence'),
  cairo: () => import('@shikijs/langs-precompiled/cairo'),
  clarity: () => import('@shikijs/langs-precompiled/clarity'),
  clojure: () => import('@shikijs/langs-precompiled/clojure'),
  clj: () => import('@shikijs/langs-precompiled/clojure'),
  cmake: () => import('@shikijs/langs-precompiled/cmake'),
  cobol: () => import('@shikijs/langs-precompiled/cobol'),
  codeowners: () => import('@shikijs/langs-precompiled/codeowners'),
  codeql: () => import('@shikijs/langs-precompiled/codeql'),
  ql: () => import('@shikijs/langs-precompiled/codeql'),
  coffee: () => import('@shikijs/langs-precompiled/coffee'),
  coffeescript: () => import('@shikijs/langs-precompiled/coffee'),
  'common-lisp': () => import('@shikijs/langs-precompiled/common-lisp'),
  lisp: () => import('@shikijs/langs-precompiled/common-lisp'),
  coq: () => import('@shikijs/langs-precompiled/coq'),
  cpp: () => import('@shikijs/langs-precompiled/cpp'),
  'c++': () => import('@shikijs/langs-precompiled/cpp'),
  crystal: () => import('@shikijs/langs-precompiled/crystal'),
  csharp: () => import('@shikijs/langs-precompiled/csharp'),
  'c#': () => import('@shikijs/langs-precompiled/csharp'),
  cs: () => import('@shikijs/langs-precompiled/csharp'),
  css: () => import('@shikijs/langs-precompiled/css'),
  csv: () => import('@shikijs/langs-precompiled/csv'),
  cue: () => import('@shikijs/langs-precompiled/cue'),
  cypher: () => import('@shikijs/langs-precompiled/cypher'),
  cql: () => import('@shikijs/langs-precompiled/cypher'),
  d: () => import('@shikijs/langs-precompiled/d'),
  dart: () => import('@shikijs/langs-precompiled/dart'),
  dax: () => import('@shikijs/langs-precompiled/dax'),
  desktop: () => import('@shikijs/langs-precompiled/desktop'),
  diff: () => import('@shikijs/langs-precompiled/diff'),
  docker: () => import('@shikijs/langs-precompiled/docker'),
  dockerfile: () => import('@shikijs/langs-precompiled/docker'),
  dotenv: () => import('@shikijs/langs-precompiled/dotenv'),
  'dream-maker': () => import('@shikijs/langs-precompiled/dream-maker'),
  edge: () => import('@shikijs/langs-precompiled/edge'),
  elixir: () => import('@shikijs/langs-precompiled/elixir'),
  elm: () => import('@shikijs/langs-precompiled/elm'),
  'emacs-lisp': () => import('@shikijs/langs-precompiled/emacs-lisp'),
  elisp: () => import('@shikijs/langs-precompiled/emacs-lisp'),
  erb: () => import('@shikijs/langs-precompiled/erb'),
  erlang: () => import('@shikijs/langs-precompiled/erlang'),
  erl: () => import('@shikijs/langs-precompiled/erlang'),
  fennel: () => import('@shikijs/langs-precompiled/fennel'),
  fish: () => import('@shikijs/langs-precompiled/fish'),
  fluent: () => import('@shikijs/langs-precompiled/fluent'),
  ftl: () => import('@shikijs/langs-precompiled/fluent'),
  'fortran-fixed-form': () =>
    import('@shikijs/langs-precompiled/fortran-fixed-form'),
  f: () => import('@shikijs/langs-precompiled/fortran-fixed-form'),
  for: () => import('@shikijs/langs-precompiled/fortran-fixed-form'),
  f77: () => import('@shikijs/langs-precompiled/fortran-fixed-form'),
  'fortran-free-form': () =>
    import('@shikijs/langs-precompiled/fortran-free-form'),
  f90: () => import('@shikijs/langs-precompiled/fortran-free-form'),
  f95: () => import('@shikijs/langs-precompiled/fortran-free-form'),
  f03: () => import('@shikijs/langs-precompiled/fortran-free-form'),
  f08: () => import('@shikijs/langs-precompiled/fortran-free-form'),
  f18: () => import('@shikijs/langs-precompiled/fortran-free-form'),
  fsharp: () => import('@shikijs/langs-precompiled/fsharp'),
  'f#': () => import('@shikijs/langs-precompiled/fsharp'),
  fs: () => import('@shikijs/langs-precompiled/fsharp'),
  gdresource: () => import('@shikijs/langs-precompiled/gdresource'),
  gdscript: () => import('@shikijs/langs-precompiled/gdscript'),
  gdshader: () => import('@shikijs/langs-precompiled/gdshader'),
  genie: () => import('@shikijs/langs-precompiled/genie'),
  gherkin: () => import('@shikijs/langs-precompiled/gherkin'),
  'git-commit': () => import('@shikijs/langs-precompiled/git-commit'),
  'git-rebase': () => import('@shikijs/langs-precompiled/git-rebase'),
  gleam: () => import('@shikijs/langs-precompiled/gleam'),
  'glimmer-js': () => import('@shikijs/langs-precompiled/glimmer-js'),
  gjs: () => import('@shikijs/langs-precompiled/glimmer-js'),
  'glimmer-ts': () => import('@shikijs/langs-precompiled/glimmer-ts'),
  gts: () => import('@shikijs/langs-precompiled/glimmer-ts'),
  glsl: () => import('@shikijs/langs-precompiled/glsl'),
  gnuplot: () => import('@shikijs/langs-precompiled/gnuplot'),
  go: () => import('@shikijs/langs-precompiled/go'),
  graphql: () => import('@shikijs/langs-precompiled/graphql'),
  gql: () => import('@shikijs/langs-precompiled/graphql'),
  groovy: () => import('@shikijs/langs-precompiled/groovy'),
  hack: () => import('@shikijs/langs-precompiled/hack'),
  haml: () => import('@shikijs/langs-precompiled/haml'),
  handlebars: () => import('@shikijs/langs-precompiled/handlebars'),
  hbs: () => import('@shikijs/langs-precompiled/handlebars'),
  haskell: () => import('@shikijs/langs-precompiled/haskell'),
  hs: () => import('@shikijs/langs-precompiled/haskell'),
  haxe: () => import('@shikijs/langs-precompiled/haxe'),
  hcl: () => import('@shikijs/langs-precompiled/hcl'),
  hjson: () => import('@shikijs/langs-precompiled/hjson'),
  hlsl: () => import('@shikijs/langs-precompiled/hlsl'),
  html: () => import('@shikijs/langs-precompiled/html'),
  'html-derivative': () => import('@shikijs/langs-precompiled/html-derivative'),
  http: () => import('@shikijs/langs-precompiled/http'),
  hurl: () => import('@shikijs/langs-precompiled/hurl'),
  hxml: () => import('@shikijs/langs-precompiled/hxml'),
  hy: () => import('@shikijs/langs-precompiled/hy'),
  imba: () => import('@shikijs/langs-precompiled/imba'),
  ini: () => import('@shikijs/langs-precompiled/ini'),
  properties: () => import('@shikijs/langs-precompiled/ini'),
  java: () => import('@shikijs/langs-precompiled/java'),
  javascript: () => import('@shikijs/langs-precompiled/javascript'),
  js: () => import('@shikijs/langs-precompiled/javascript'),
  cjs: () => import('@shikijs/langs-precompiled/javascript'),
  mjs: () => import('@shikijs/langs-precompiled/javascript'),
  jinja: () => import('@shikijs/langs-precompiled/jinja'),
  jison: () => import('@shikijs/langs-precompiled/jison'),
  json: () => import('@shikijs/langs-precompiled/json'),
  json5: () => import('@shikijs/langs-precompiled/json5'),
  jsonc: () => import('@shikijs/langs-precompiled/jsonc'),
  jsonl: () => import('@shikijs/langs-precompiled/jsonl'),
  jsonnet: () => import('@shikijs/langs-precompiled/jsonnet'),
  jssm: () => import('@shikijs/langs-precompiled/jssm'),
  fsl: () => import('@shikijs/langs-precompiled/jssm'),
  jsx: () => import('@shikijs/langs-precompiled/jsx'),
  julia: () => import('@shikijs/langs-precompiled/julia'),
  jl: () => import('@shikijs/langs-precompiled/julia'),
  kdl: () => import('@shikijs/langs-precompiled/kdl'),
  kotlin: () => import('@shikijs/langs-precompiled/kotlin'),
  kt: () => import('@shikijs/langs-precompiled/kotlin'),
  kts: () => import('@shikijs/langs-precompiled/kotlin'),
  kusto: () => import('@shikijs/langs-precompiled/kusto'),
  kql: () => import('@shikijs/langs-precompiled/kusto'),
  latex: () => import('@shikijs/langs-precompiled/latex'),
  lean: () => import('@shikijs/langs-precompiled/lean'),
  lean4: () => import('@shikijs/langs-precompiled/lean'),
  less: () => import('@shikijs/langs-precompiled/less'),
  liquid: () => import('@shikijs/langs-precompiled/liquid'),
  llvm: () => import('@shikijs/langs-precompiled/llvm'),
  log: () => import('@shikijs/langs-precompiled/log'),
  logo: () => import('@shikijs/langs-precompiled/logo'),
  lua: () => import('@shikijs/langs-precompiled/lua'),
  luau: () => import('@shikijs/langs-precompiled/luau'),
  make: () => import('@shikijs/langs-precompiled/make'),
  makefile: () => import('@shikijs/langs-precompiled/make'),
  markdown: () => import('@shikijs/langs-precompiled/markdown'),
  md: () => import('@shikijs/langs-precompiled/markdown'),
  marko: () => import('@shikijs/langs-precompiled/marko'),
  matlab: () => import('@shikijs/langs-precompiled/matlab'),
  mdc: () => import('@shikijs/langs-precompiled/mdc'),
  mdx: () => import('@shikijs/langs-precompiled/mdx'),
  mermaid: () => import('@shikijs/langs-precompiled/mermaid'),
  mmd: () => import('@shikijs/langs-precompiled/mermaid'),
  mipsasm: () => import('@shikijs/langs-precompiled/mipsasm'),
  mips: () => import('@shikijs/langs-precompiled/mipsasm'),
  mojo: () => import('@shikijs/langs-precompiled/mojo'),
  move: () => import('@shikijs/langs-precompiled/move'),
  narrat: () => import('@shikijs/langs-precompiled/narrat'),
  nar: () => import('@shikijs/langs-precompiled/narrat'),
  nextflow: () => import('@shikijs/langs-precompiled/nextflow'),
  nf: () => import('@shikijs/langs-precompiled/nextflow'),
  nginx: () => import('@shikijs/langs-precompiled/nginx'),
  nim: () => import('@shikijs/langs-precompiled/nim'),
  nix: () => import('@shikijs/langs-precompiled/nix'),
  nushell: () => import('@shikijs/langs-precompiled/nushell'),
  nu: () => import('@shikijs/langs-precompiled/nushell'),
  'objective-c': () => import('@shikijs/langs-precompiled/objective-c'),
  objc: () => import('@shikijs/langs-precompiled/objective-c'),
  'objective-cpp': () => import('@shikijs/langs-precompiled/objective-cpp'),
  ocaml: () => import('@shikijs/langs-precompiled/ocaml'),
  openscad: () => import('@shikijs/langs-precompiled/openscad'),
  scad: () => import('@shikijs/langs-precompiled/openscad'),
  pascal: () => import('@shikijs/langs-precompiled/pascal'),
  perl: () => import('@shikijs/langs-precompiled/perl'),
  php: () => import('@shikijs/langs-precompiled/php'),
  pkl: () => import('@shikijs/langs-precompiled/pkl'),
  plsql: () => import('@shikijs/langs-precompiled/plsql'),
  po: () => import('@shikijs/langs-precompiled/po'),
  pot: () => import('@shikijs/langs-precompiled/po'),
  potx: () => import('@shikijs/langs-precompiled/po'),
  polar: () => import('@shikijs/langs-precompiled/polar'),
  postcss: () => import('@shikijs/langs-precompiled/postcss'),
  powerquery: () => import('@shikijs/langs-precompiled/powerquery'),
  powershell: () => import('@shikijs/langs-precompiled/powershell'),
  ps: () => import('@shikijs/langs-precompiled/powershell'),
  ps1: () => import('@shikijs/langs-precompiled/powershell'),
  prisma: () => import('@shikijs/langs-precompiled/prisma'),
  prolog: () => import('@shikijs/langs-precompiled/prolog'),
  proto: () => import('@shikijs/langs-precompiled/proto'),
  protobuf: () => import('@shikijs/langs-precompiled/proto'),
  pug: () => import('@shikijs/langs-precompiled/pug'),
  jade: () => import('@shikijs/langs-precompiled/pug'),
  puppet: () => import('@shikijs/langs-precompiled/puppet'),
  purescript: () => import('@shikijs/langs-precompiled/purescript'),
  python: () => import('@shikijs/langs-precompiled/python'),
  py: () => import('@shikijs/langs-precompiled/python'),
  qml: () => import('@shikijs/langs-precompiled/qml'),
  qmldir: () => import('@shikijs/langs-precompiled/qmldir'),
  qss: () => import('@shikijs/langs-precompiled/qss'),
  r: () => import('@shikijs/langs-precompiled/r'),
  racket: () => import('@shikijs/langs-precompiled/racket'),
  raku: () => import('@shikijs/langs-precompiled/raku'),
  perl6: () => import('@shikijs/langs-precompiled/raku'),
  razor: () => import('@shikijs/langs-precompiled/razor'),
  reg: () => import('@shikijs/langs-precompiled/reg'),
  regexp: () => import('@shikijs/langs-precompiled/regexp'),
  regex: () => import('@shikijs/langs-precompiled/regexp'),
  rel: () => import('@shikijs/langs-precompiled/rel'),
  riscv: () => import('@shikijs/langs-precompiled/riscv'),
  rosmsg: () => import('@shikijs/langs-precompiled/rosmsg'),
  rst: () => import('@shikijs/langs-precompiled/rst'),
  ruby: () => import('@shikijs/langs-precompiled/ruby'),
  rb: () => import('@shikijs/langs-precompiled/ruby'),
  rust: () => import('@shikijs/langs-precompiled/rust'),
  rs: () => import('@shikijs/langs-precompiled/rust'),
  sas: () => import('@shikijs/langs-precompiled/sas'),
  sass: () => import('@shikijs/langs-precompiled/sass'),
  scala: () => import('@shikijs/langs-precompiled/scala'),
  scheme: () => import('@shikijs/langs-precompiled/scheme'),
  scss: () => import('@shikijs/langs-precompiled/scss'),
  sdbl: () => import('@shikijs/langs-precompiled/sdbl'),
  '1c-query': () => import('@shikijs/langs-precompiled/sdbl'),
  shaderlab: () => import('@shikijs/langs-precompiled/shaderlab'),
  shader: () => import('@shikijs/langs-precompiled/shaderlab'),
  shellscript: () => import('@shikijs/langs-precompiled/shellscript'),
  bash: () => import('@shikijs/langs-precompiled/shellscript'),
  sh: () => import('@shikijs/langs-precompiled/shellscript'),
  shell: () => import('@shikijs/langs-precompiled/shellscript'),
  zsh: () => import('@shikijs/langs-precompiled/shellscript'),
  shellsession: () => import('@shikijs/langs-precompiled/shellsession'),
  console: () => import('@shikijs/langs-precompiled/shellsession'),
  smalltalk: () => import('@shikijs/langs-precompiled/smalltalk'),
  solidity: () => import('@shikijs/langs-precompiled/solidity'),
  soy: () => import('@shikijs/langs-precompiled/soy'),
  'closure-templates': () => import('@shikijs/langs-precompiled/soy'),
  sparql: () => import('@shikijs/langs-precompiled/sparql'),
  splunk: () => import('@shikijs/langs-precompiled/splunk'),
  spl: () => import('@shikijs/langs-precompiled/splunk'),
  sql: () => import('@shikijs/langs-precompiled/sql'),
  'ssh-config': () => import('@shikijs/langs-precompiled/ssh-config'),
  stata: () => import('@shikijs/langs-precompiled/stata'),
  stylus: () => import('@shikijs/langs-precompiled/stylus'),
  styl: () => import('@shikijs/langs-precompiled/stylus'),
  svelte: () => import('@shikijs/langs-precompiled/svelte'),
  swift: () => import('@shikijs/langs-precompiled/swift'),
  'system-verilog': () => import('@shikijs/langs-precompiled/system-verilog'),
  systemd: () => import('@shikijs/langs-precompiled/systemd'),
  talonscript: () => import('@shikijs/langs-precompiled/talonscript'),
  talon: () => import('@shikijs/langs-precompiled/talonscript'),
  tasl: () => import('@shikijs/langs-precompiled/tasl'),
  tcl: () => import('@shikijs/langs-precompiled/tcl'),
  templ: () => import('@shikijs/langs-precompiled/templ'),
  terraform: () => import('@shikijs/langs-precompiled/terraform'),
  tf: () => import('@shikijs/langs-precompiled/terraform'),
  tfvars: () => import('@shikijs/langs-precompiled/terraform'),
  tex: () => import('@shikijs/langs-precompiled/tex'),
  toml: () => import('@shikijs/langs-precompiled/toml'),
  'ts-tags': () => import('@shikijs/langs-precompiled/ts-tags'),
  lit: () => import('@shikijs/langs-precompiled/ts-tags'),
  tsv: () => import('@shikijs/langs-precompiled/tsv'),
  tsx: () => import('@shikijs/langs-precompiled/tsx'),
  turtle: () => import('@shikijs/langs-precompiled/turtle'),
  twig: () => import('@shikijs/langs-precompiled/twig'),
  typescript: () => import('@shikijs/langs-precompiled/typescript'),
  ts: () => import('@shikijs/langs-precompiled/typescript'),
  cts: () => import('@shikijs/langs-precompiled/typescript'),
  mts: () => import('@shikijs/langs-precompiled/typescript'),
  typespec: () => import('@shikijs/langs-precompiled/typespec'),
  tsp: () => import('@shikijs/langs-precompiled/typespec'),
  typst: () => import('@shikijs/langs-precompiled/typst'),
  typ: () => import('@shikijs/langs-precompiled/typst'),
  v: () => import('@shikijs/langs-precompiled/v'),
  vala: () => import('@shikijs/langs-precompiled/vala'),
  vb: () => import('@shikijs/langs-precompiled/vb'),
  cmd: () => import('@shikijs/langs-precompiled/vb'),
  verilog: () => import('@shikijs/langs-precompiled/verilog'),
  vhdl: () => import('@shikijs/langs-precompiled/vhdl'),
  viml: () => import('@shikijs/langs-precompiled/viml'),
  vim: () => import('@shikijs/langs-precompiled/viml'),
  vimscript: () => import('@shikijs/langs-precompiled/viml'),
  vue: () => import('@shikijs/langs-precompiled/vue'),
  'vue-html': () => import('@shikijs/langs-precompiled/vue-html'),
  'vue-vine': () => import('@shikijs/langs-precompiled/vue-vine'),
  vyper: () => import('@shikijs/langs-precompiled/vyper'),
  vy: () => import('@shikijs/langs-precompiled/vyper'),
  wasm: () => import('@shikijs/langs-precompiled/wasm'),
  wenyan: () => import('@shikijs/langs-precompiled/wenyan'),
  文言: () => import('@shikijs/langs-precompiled/wenyan'),
  wgsl: () => import('@shikijs/langs-precompiled/wgsl'),
  wikitext: () => import('@shikijs/langs-precompiled/wikitext'),
  mediawiki: () => import('@shikijs/langs-precompiled/wikitext'),
  wiki: () => import('@shikijs/langs-precompiled/wikitext'),
  wit: () => import('@shikijs/langs-precompiled/wit'),
  wolfram: () => import('@shikijs/langs-precompiled/wolfram'),
  wl: () => import('@shikijs/langs-precompiled/wolfram'),
  xml: () => import('@shikijs/langs-precompiled/xml'),
  xsl: () => import('@shikijs/langs-precompiled/xsl'),
  yaml: () => import('@shikijs/langs-precompiled/yaml'),
  yml: () => import('@shikijs/langs-precompiled/yaml'),
  zenscript: () => import('@shikijs/langs-precompiled/zenscript'),
  zig: () => import('@shikijs/langs-precompiled/zig'),
} as Record<BundledLanguage, DynamicImportLanguageRegistration>

const bundledThemes = {
  'tokyo-night': () => import('@shikijs/themes/tokyo-night'),
} as Record<BundledTheme, DynamicImportThemeRegistration>

const createHighlighter = /* @__PURE__ */ createBundledHighlighter<
  BundledLanguage,
  BundledTheme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createJavaScriptRegexEngine(),
})

const {
  codeToHtml,
  codeToHast,
  codeToTokensBase,
  codeToTokens,
  codeToTokensWithThemes,
  getSingletonHighlighter,
  getLastGrammarState,
} = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(
  createHighlighter,
)

export {
  bundledLanguages,
  bundledThemes,
  codeToHast,
  codeToHtml,
  codeToTokens,
  codeToTokensBase,
  codeToTokensWithThemes,
  createHighlighter,
  getLastGrammarState,
  getSingletonHighlighter,
}
export type { BundledLanguage, BundledTheme, Highlighter }
