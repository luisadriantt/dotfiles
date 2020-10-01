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
    Plug 'vwxyutarooo/nerdtree-devicons-syntax'        " Better icons
    Plug 'Xuyuanp/nerdtree-git-plugin'               " Git for nt
"{{ Productivity }}
    Plug 'vimwiki/vimwiki'                             " VimWiki 
    Plug 'jreybert/vimagit'                            " Magit-like plugin for vim
    Plug 'itchyny/vim-gitbranch'                       " Show git branch
    Plug 'Shougo/denite.nvim', { 'do': ':UpdateRemotePlugins' } "Search in fles
    Plug 'dyng/ctrlsf.vim'                             " File search  
    Plug 'jiangmiao/auto-pairs'                        " Insert or delete brackets, parens, quotes in pair.
    Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
    Plug 'junegunn/fzf.vim'                            " Fuzzy search
    Plug 'voldikss/vim-floaterm'                       " Open floating terminal
    Plug 'tpope/vim-surround'                          " Change surrounding marks
    Plug 'tpope/vim-fugitive'                          " Git Support
    Plug 'tommcdo/vim-fugitive-blame-ext'              " Git Support
    Plug 'mileszs/ack.vim'
"{{ Syntax Highlighting and Colors }}
    Plug 'PotatoesMaster/i3-vim-syntax'                " i3 config highlighting
    Plug 'kovetskiy/sxhkd-vim'                         " sxhkd highlighting
    Plug 'vim-python/python-syntax'                    " Python highlighting
    Plug 'ap/vim-css-color'                            " Color previews for CSS
    Plug 'pangloss/vim-javascript'
    Plug 'joshdick/onedark.vim'
    Plug 'haya14busa/incsearch.vim'                    " Better Hlsearch
"{{ Junegunn Choi Plugins }}
    Plug 'junegunn/goyo.vim'                           " Distraction-free viewing
    Plug 'junegunn/limelight.vim'                      " Hyperfocus on a range
    Plug 'junegunn/vim-emoji'                          " Vim needs emojis!
"{{ Python }}
    Plug 'davidhalter/jedi-vim'                         " jedi for python
    Plug 'Vimjas/vim-python-pep8-indent'                " better indenting for python
    Plug 'airblade/vim-gitgutter'                       " show git changes to files in gutter
    Plug 'roxma/nvim-yarp'                              " dependency of ncm2
    Plug 'ncm2/ncm2'                                    " awesome autocomplete plugin
    Plug 'HansPinckaers/ncm2-jedi'                      " fast python completion (use ncm2 if you want type info or snippet support)
    Plug 'ncm2/ncm2-bufword'                            " buffer keyword completion
    Plug 'ncm2/ncm2-path'                               " filepath completion
    Plug 'kien/ctrlp.vim'                               " fuzzy search files
    Plug 'tweekmonster/impsort.vim'                     " color and sort imports
    Plug 'w0rp/ale'                         " python linters
    Plug 'jmcantrell/vim-virtualenv'

call plug#end()

let g:python3_host_prog = '/home/blade/.pyenv/versions/tryton/bin/python'
let g:python_host_prog = '/usr/bin/python'

source ~/.config/nvim/settings.vim
source ~/.config/nvim/mappings.vim

filetype plugin indent on    " required

" To ignore plugin indent changes, instead use:
" filetype plugin on

" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal

" see :h vundle for more details or wiki for FAQ

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Colors and Theming
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"highlight LineNr           ctermfg=8    ctermbg=none    cterm=none
"highlight CursorLineNr     ctermfg=7    ctermbg=8       cterm=none
"highlight VertSplit        ctermfg=0    ctermbg=8       cterm=none
"highlight Statement        ctermfg=2    ctermbg=none    cterm=none
"highlight Directory        ctermfg=4    ctermbg=none    cterm=none
"highlight StatusLine       ctermfg=7    ctermbg=8       cterm=none
"highlight StatusLineNC     ctermfg=7    ctermbg=8       cterm=none
"highlight NERDTreeClosable ctermfg=2
"highlight NERDTreeOpenable ctermfg=8
"highlight Comment          ctermfg=4    ctermbg=none    cterm=italic
"highlight Constant         ctermfg=12   ctermbg=none    cterm=none
"highlight Special          ctermfg=4    ctermbg=none    cterm=none
"highlight Identifier       ctermfg=6    ctermbg=none    cterm=none
"highlight PreProc          ctermfg=5    ctermbg=none    cterm=none
"highlight String           ctermfg=12   ctermbg=none    cterm=none
"highlight Number           ctermfg=1    ctermbg=none    cterm=none
"highlight Function         ctermfg=1    ctermbg=none    cterm=none
