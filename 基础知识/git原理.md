# git 原理

## .git 目录

1、objects
add 添加 blob object
commit 添加 tree object 和 commit object

commit：上一个提交、作者、提交信息
tree：目录结构、文件权限、文件名
blob：文件内容
commit - tree - blob

空文件夹通过 .gitkeep 保留，否则不会保留下来

Q:为什么文件权限和文件名要放在tree object，而不是 blob object？
A:节约空间，因为复用blob object占据的空间更小，只需要新建一个tree object；

git 通过 分布式 保证了不可篡改；

2、refs
储存分支信息、tag

3、HEAD
储存当前分支信息

***

同一个文件每次修改都会**新建**一个 blob object，每次都是一个完整的新的文件，而不是变更部分；
原因：比较 diff 的时候只需要取两个 blob object 对比，不然如果中间间隔好几次修改，可能需要把修改过程中的所有变更都算一次，这样 diff 时间太慢；
但是git会在仓库比较大的时候会进行**压缩**，局部使用变更部分作为记录（网络好的情况，跟远程协商），所以并不总是记录整个文件，大多数情况下是保留整个文件进行记录的；

以下三种的区别：
--mixed是默认，所以也可以不写
git reset --soft head~
git reset --mixed head~
git reset --hard head~

为什么需要使用3向合并
因为需要一个base，不然并不知道两个文件是怎么进行修改的

## git merge 策略

1、Fast-forward
2、Recursive，递归3向合并
3、Ours & Theirs，直接忽略另一个
4、Octopus，超过2条分支的合并


最好，不要对多人共用的远端分支做rebase，建议个人使用的分支用rebase，其它情况用merge

误操作删除分支后，如何恢复？
git reflog 找到删除前的操作记录
reflog只会存在于本机，并且有时效，默认180天
超过180天后，没有用的 commit 会被 gc

获得干净的工作目录
git stash push

git filter branch 可以修改整条提交记录的每个节点