import React, { useState, useEffect, createRef } from "react";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Button,
  Avatar,
  Tooltip,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Drawer,
  Box,
  Dialog,
  DialogTitle,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RemoveIcon from "@mui/icons-material/Remove";

//Providerのimport
import { getChannelList } from "../provider/channel-provider";
import { getMessageList } from "../provider/message-provider";

//modelのimport
import Channel from "../models/Channel";
import Message from "../models/Message";
import User from "../models/User";

export default function Main() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [users, setUsers] = useState<User>({
    id: 0,
    name: "ひろばくん",
    avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
    channel: [0, 1, 2, 3],
    login: true,
  });
  const [message, setMessage] = useState<Message[]>([]);
  const [current, setCurrent] = useState<number>(0); // 現在の選択されているチャンネル
  const [value, setValue] = useState<string>(""); // テキストボックスに入力されている値
  const ref = createRef<HTMLDivElement>(); // メッセージエリアを参照するためのマーカー

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null); // ユーザーメニュー表示非表示
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null); // ハンバーガーメニュー表示非表示
  const [open, setOpen] = useState<boolean>(false); // モーダルのオープン/クローズ

  let testUser: User[] = [
    {
      id: 0,
      name: "ひろばくん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
      channel: [0, 1, 2, 3],
      login: true,
    },
    {
      id: 1,
      name: "ひろばさん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559325_female-avatar-clipart.png",
      channel: [0, 1, 2],
      login: true,
    },
  ];
  // サイドメニューの幅
  const drawerWidth: number = 240;
  // AppBarの設定
  const pages: string[] = ["チャンネル", "調整中"];
  const settings: string[] = ["アカウント", "チャンネル", "ログアウト"];

  // テスト用にユーザー変更
  const changeUser = (e: number) => {
    setUsers(testUser[e]);
  };
  const handleOnClick = (e: number) => {
    setCurrent(e);
  };
  const handleSubmit = () => {
    message.push({
      channelId: current,
      text: value,
      time: new Date().toString(),
      userId: users.id,
    });
    setMessage(message);
    setValue("");
  };
  //ここでチャンネルに紐づくデータを取得する。
  const getMessage = () => {
    getMessageList()
      .then((message) => {
        //データが取得できているか確認する時に使用する
        // console.log(dialog);
        setMessage(message);
      })
      .catch((e) => {
        console.log("データがありませんでした。");
      });
  };

  // 読み込み時にtestUser＆firebaseから取得する
  useEffect(() => {
    //getChannel();
    getChannelList(users.channel, setChannels);
    getMessage();
    setUsers(testUser[0]);
  }, []);

  useEffect(() => {
    ref!.current!.scrollIntoView({
      // ! 表記はundefinedやnullにはならないということ
      behavior: "smooth",
      block: "end",
    });
  }, [ref]);

  // ハンバーガーメニューをオープン
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  // ハンバーガーメニューをクローズ
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // ユーザーメニューをオープン
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  // ユーザーメニューをクローズ
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // モーダルをオープン
  const handleClickOpen = () => {
    setOpen(true);
  };
  // モーダル外をクリックでクローズ
  const handleClose = () => {
    setOpen(false);
  };
  const handleListItemClick = () => {
    console.log("クリックされました");
  };

  // ブレークポイント　xs: 0px sm: 600px md: 900px lg: 1200px xl: 1536px
  return (
    <>
      {/* 大枠はContainerで包む、sxはcssにアクセスする maxのブレークポイントを設定 */}
      <Container sx={{ display: "flex" }} maxWidth="xl">
        {/* ブラウザーの差異を平均化 */}
        <CssBaseline />
        {/* AppBarが幅いっぱいになるzIndex*/}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          {/* disableGutters 左右の端の余白なし */}
          <Toolbar disableGutters>
            {/* varient 文字の大きさ  noWrap 文字の折り返しなし sx テーマへのアクセス mr マージンライト */}
            <Typography variant="h3" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              hirobats
            </Typography>
            {/* md未満の幅になった場合に表示される */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              hirobats
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                // my = マージントップ&マージンボトム
                <Button key={index} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {/* // Tooltip 吹き出し */}
              <Tooltip title="セッティング">
                {/* p パディング */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={users.name} src={users.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* サイドメニュー */}
        <Drawer
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box", // パディング、境界、マージンを含ない
            },
          }}
          variant="permanent" // 永続的に表示
          anchor="left" // 左に表示
        >
          <Toolbar />
          <List>
            {/* button要素を追加 */}
            <ListItem button onClick={handleClickOpen}>
              ch追加
            </ListItem>
            {/* 分離ライン */}
            <Divider />
            {/* リスト内にchannelsを展開する */}
            {users.channel.map((e: number) => (
              <ListItem button key={e} onClick={() => handleOnClick(e)}>
                <ListItemText primary={e} />
              </ListItem>
            ))}
            {/* 分離ライン */}
            <Divider />
            {/* リスト内にusersを展開する（ユーザー変更テスト用） */}
            {testUser.map((testUser: User) => (
              <ListItem button key={testUser.id} onClick={() => changeUser(testUser.id)}>
                <ListItemText primary={testUser.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* メインエリア */}
        <Container maxWidth="xl" ref={ref}>
          {/* Appnav分の高さを下げる */}
          <Toolbar />
          {/* messageの内容をListセットに展開する */}
          {message.map((e: Message, index) => {
            if (e.channelId === current) {
              return (
                <div key={index}>
                  {users.id === e.userId ? (
                    <List>
                      <Avatar alt={users.name} src={users.avatar} />
                      <ListItemText primary={e.userId} />
                      <ListItemText primary={e.text} />
                      <ListItemText primary={e.time} />
                    </List>
                  ) : (
                    <List>
                      <ListItemText primary={e.userId} />
                      <ListItemText primary={e.text} />
                      <ListItemText primary={e.time} />
                    </List>
                  )}
                </div>
              );
            }
          })}
          <Box>
            <TextField
              id="filled-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={4}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="filled"
            />
          </Box>
          {value ? (
            <Button onClick={handleSubmit}>送信する</Button>
          ) : (
            <Button onClick={handleSubmit} disabled>
              送信する
            </Button>
          )}
        </Container>

        {/* モーダル */}
        <Dialog onClose={handleClose} open={open}>
          {/* モーダルタイトル */}
          <DialogTitle>チャンネル一覧</DialogTitle>
          {/* リストを展開 パディングトップ*/}
          {users.channel.map((e: number, index) => (
            <List key={index}>
              <ListItem button onClick={() => handleListItemClick}>
                <ListItemAvatar>
                  <Avatar>
                    <RemoveIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={e} />
              </ListItem>
            </List>
          ))}
        </Dialog>
      </Container>
    </>
  );
}
