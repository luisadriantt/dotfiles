set nocompatible              " be iMproved, required
set hlsearch
set ic

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Vundle For Managing Plugins
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""


call plug#begin('~/.vim/plugged')

"{{ The Basics }}
    Plug 'gmarik/Vundle.vim'                           " Vundle
    Plug 'itchyny/lightline.vim'                       " Lightline statusbar
    Plug 'suan/vim-instant-markdown', {'rtp': 'after'} " Markdown Preview
    Plug 'neoclide/coc.nvim', {'branch': 'release'}
    Plug 'frazrepo/vim-rainbow'
"{{ File management }}
    Plug 'vifm/vifm.vim'                               " Vifm
    Plug 'scrooloose/nerdtree'                         " Nerdtree
    Plug 'tiagofumo/vim-nerdtree-syntax-highlight'     " Highlighting Nerdtree
    Plug 'ryanoasis/vim-devicons'                      " Icons for Nerdtree
    Plug 'Xuyuanp/nerdtree-git-plugin'               " Git for nt
"{{ Productivity }}
    Plug 'vimwiki/vimwiki'                             " VimWiki 
    Plug 'jreybert/vimagit'                            " Magit-like plugin for vim
    Plug 'itchyny/vim-gitbranch'                       " Show git branch
    Plug 'dyng/ctrlsf.vim'                             " File search  
    Plug 'jiangmiao/auto-pairs'                        " Insert or delete brackets, parens, quotes in pair.
    Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
    Plug 'junegunn/fzf.vim'                            " Fuzzy search
    Plug 'voldikss/vim-floaterm'                       " Open floating terminal
"{{ Tim Pope Plugins }}
    Plug 'tpope/vim-surround'                          " Change surrounding marks
    Plug 'tpope/vim-fugitive'                          " Git Support
    Plug 'tommcdo/vim-fugitive-blame-ext'              " Git Support
"{{ Syntax Highlighting and Colors }}
    Plug 'ap/vim-css-color'                            " Color previews for CSS
    Plug 'joshdick/onedark.vim'
    Plug 'haya14busa/incsearch.vim'                    " Better Hlsearch
"{{ Junegunn Choi Plugins }}
    Plug 'junegunn/goyo.vim'                           " Distraction-free viewing
    Plug 'junegunn/limelight.vim'                      " Hyperfocus on a range
    Plug 'junegunn/vim-emoji'                          " Vim needs emojis!
    Plug 'kien/ctrlp.vim'                               " fuzzy search files
    Plug 'wsdjeg/FlyGrep.vim'                           " awesome grep on the fly
    Plug 'jmcantrell/vim-virtualenv'
"{{ Flutter plugins }}
    Plug 'SirVer/Ultisnips'
    Plug 'natebosch/dartlang-snippets'
    Plug 'dart-lang/dart-vim-plugin'
    Plug 'thosakwe/vim-flutter'

call plug#end()

source ~/.config/nvim/settings.vim
source ~/.config/nvim/mappings.vim
source ~/.config/nvim/plug/autocompletion.vim
source ~/.config/nvim/plug/prettier.vim
source ~/.config/nvim/plug/grammarous.vim

filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
" filetype plugin on

" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal


let g:python3_host_prog = '/Users/ohno/.pyenv/versions/py3/bin/python'
let g:python_host_prog = '/usr/bin/python'


"make vim save and load the folding of the document each time it loads"
"also places the cursor in the last place that it was left."
if has("autocmd")
  au BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$") | exe "normal! g`\"" | endif
endif

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Status Line
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" The lightline.vim theme
"let g:lightline = {
"      \ 'component_function': {
"      \   'filename': 'LightlineFilename',
"      \   'gitbranch': 'gitbranch#name',
"      \ },
"      \ 'colorscheme': 'seoul256',
"      \ }
"
"function! LightlineFilename()
"  let root = fnamemodify(get(b:, 'git_dir'), ':h')
"  let path = expand('%:p')
"  if path[:len(root)-1] ==# root
"    return path[len(root)+1:]
"  endif
"  return expand('%')
"endfunction
let g:lightline = {
      \ 'active': {
      \   'left': [ [ 'mode', 'paste' ],
      \             [ 'gitbranch', 'readonly', 'filename', 'modified' ] ]
      \ },
      \ 'component_function': {
      \   'gitbranch': 'gitbranch#name'
      \ },
      \ 'colorscheme': 'wombat',
      \ }

