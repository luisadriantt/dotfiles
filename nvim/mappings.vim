"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Remap Keys
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Remap ESC to ;;
inoremap ;; <Esc>
" Exit terminal mode
tnoremap <Esc> <C-\><C-n>
" reload configuration
nnoremap <leader>r :source ~/.config/nvim/init.vim<CR>
" source configuration
nnoremap <leader>rc :so ~/.config/nvim/init.vim<CR>
" Save
inoremap <C-s> <C-O>:update<cr>
nnoremap <C-s> :update<cr>
" buffer
nnoremap <Leader><Tab> :e#<CR> " switch to last buffer
nnoremap <leader>bb :Buffers<CR>
nnoremap <leader>bd :bdelete<CR>
nnoremap <leader>bn :bnext<CR>
nnoremap <leader>bp :bprevious<CR>
nnoremap <leader>b/ :Lines<CR>
nnoremap <leader>bl :BLines<CR>
" Start of a line - end of a line
noremap H ^
noremap L g_
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => NERDTree
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Uncomment to autostart the NERDTree
" autocmd vimenter * NERDTree
map <C-n> :NERDTreeToggle<CR>
nnoremap <silent> <Space> :NERDTreeFind<CR>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Vifm
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map <Leader>vv :Vifm<CR>
map <Leader>vs :VsplitVifm<CR>
map <Leader>sp :SplitVifm<CR>
map <Leader>dv :DiffVifm<CR>
map <Leader>tv :TabVifm<CR>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Vim-Instant-Markdown
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map <Leader>md :InstantMarkdownPreview<CR>   " Previews .md file
map <Leader>ms :InstantMarkdownStop<CR>      " Kills the preview
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Open terminal inside Vim
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map <Leader>tt :10sp term://zsh<CR>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Open terminal inside Vim
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map <Leader>tt :10sp term://zsh<CR>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Splits and Tabbed Files
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Remap splits navigation to just CTRL + hjkl
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

noremap <silent> <C-T> :tabnext<CR>
" Make adjusing split sizes a bit more friendly
noremap <silent> <C-Left> :vertical resize +3<CR>
noremap <silent> <C-Right> :vertical resize -3<CR>
noremap <silent> <C-Up> :resize +3<CR>
noremap <silent> <C-Down> :resize -3<CR>

" Change 2 split windows from vert to horiz or horiz to vert
map <Leader>th <C-w>t<C-w>H
map <Leader>tk <C-w>t<C-w>K
" ============================================================================ "
" ===                           Denite SETUP                               === "
" ============================================================================ "
nmap <leader>, :Denite buffer<CR>
nmap <leader>pd :DeniteProjectDir file/rec<CR>
nnoremap <leader>g :<C-u>Denite grep:. -no-empty<CR>
nnoremap <leader>j :<C-u>DeniteCursorWord grep:.<CR>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => FloatTerm
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map <Leader>t :FloatermNew<CR>
map <Leader>ht :FloatermHide<CR>
map <Leader>nt :FloatermNext<CR>
map <Leader>pt :FloatermPrev<CR>
map <Leader>st :FloatermShow<CR>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Python related
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" ale options
nmap <silent> <C-M> <Plug>(ale_previous_wrap)
nmap <silent> <C-m> <Plug>(ale_next_wrap)
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Git
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <leader>gb :Gblame<CR>
nnoremap <leader>gc :Gcommit<CR>
nnoremap <leader>gd :Gdiff<CR>
nnoremap <leader>ge :Gedit<CR>
nnoremap <leader>gl :GV<CR>
nnoremap <leader>gm :Gmerge<CR>
nnoremap <leader>gp :Gpush<CR>
nnoremap <leader>gs :Gstatus<CR>
nnoremap <leader>gvc :GV!<CR>
nnoremap <leader>gvq :GV?<CR>
nnoremap <leader>gw :Gwrite<CR>

" ICSearch remaps
let g:incsearch#auto_nohlsearch = 1
map n  <Plug>(incsearch-nohl-n)
map N  <Plug>(incsearch-nohl-N)
map *  <Plug>(incsearch-nohl-*)
map #  <Plug>(incsearch-nohl-#)
map g* <Plug>(incsearch-nohl-g*)
map g# <Plug>(incsearch-nohl-g#)

" Use tab for trigger completion with characters ahead and navigate.
" Use command ':verbose imap <tab>' to make sure tab is not mapped by other plugin.
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> for trigger completion.
inoremap <silent><expr> <c-space> coc#refresh()

" Crtl f search a word in project
nmap <C-f>f <Plug>(CtrlSFPrompt)
