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
import { css } from "@emotion/react";

//Providerのimport
import { getChannelList } from "../provider/channel-provider";
import { getMessageList, addMessage, deleteMessage } from "../provider/message-provider";

//modelのimport
import Channel from "../models/Channel";
import Message from "../models/Message";
import User from "../models/User";

import { formatDateTime } from "../util/date-util";

export default function Main() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [users, setUsers] = useState<User>({
    id: 0,
    name: "ひろばくん",
    avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
    channel: [0, 1, 2, 3],
    login: true,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [current, setCurrent] = useState<number>(0); // 現在の選択されているチャンネル
  const [value, setValue] = useState<string>(""); // テキストボックスに入力されている値
  const ref = createRef<HTMLDivElement>(); // メッセージエリアを参照するためのマーカー

  const [anchorElSide, setAnchorElSide] = useState<boolean | undefined>(false); // サイドメニュー表示非表示
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null); // ユーザーメニュー表示非表示
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
  const settings: string[] = ["アカウント", "チャンネル", "ログアウト"];

  // テスト用にユーザー変更
  const changeUser = (e: number) => {
    setUsers(testUser[e]);
  };
  const handleOnClick = (e: number) => {
    setCurrent(e);
  };
  const handleSubmit = () => {
    const message = {
      channelId: current,
      text: value,
      time: formatDateTime(new Date()),
      userId: users.id,
    } as Message;
    addMessage(message);
    setValue("");
  };

  // 読み込み時にtestUser＆firebaseから取得する
  useEffect(() => {
    //getChannel();
    getChannelList(users.channel, setChannels);
    getMessageList(setMessages);
    setUsers(testUser[0]);
  }, []);

  useEffect(() => {
    ref!.current!.scrollIntoView({
      // ! 表記はundefinedやnullにはならないということ
      behavior: "smooth",
      block: "end",
    });
  }, [ref]);

  // ユーザーメニューをオープン
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  // ユーザーメニューをクローズ
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // サイドメニューをオープン
  const handleOpenSideMenu = () => {
    setAnchorElSide(!anchorElSide);
  };
  // サイドメニューをクローズ
  const handleCloseSideMenu = () => {
    setAnchorElSide(false);
  };
  // モーダルをオープン
  const handleClickOpen = () => {
    setOpen(true);
  };
  // モーダル外をクリックでクローズ
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleListItemClick = () => {
    console.log("クリックされました");
  };
  // Emotionでスタイル設定
  const toolBar = css`
    height: calc(7vh);
  `;
  const messageArea = css`
    height: calc(80vh);
    display: flex;
    justify-content: flex-start;
    scroll-behavior: auto;
    overflow: auto;
  `;
  const textArea = css`
    height: calc(13vh);
  `;
  const messageContainer = css`
    display: flex;
    margin: 10px;
  `;
  const balloon = css`
    display: inline-block;
    position: relative;
    margin: 0;
    padding: 10px;
    max-width: 250px;
    border-radius: 12px;
    background: #edf1ee;
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 3px;
      left: -19px;
      border: 8px solid transparent;
      border-right: 18px solid #edf1ee;
      -webkit-transform: rotate(35deg);
      transform: rotate(35deg);
    }
  `;

  // ブレークポイント　xs: 0px～ sm: 600px～ md: 900px～ lg: 1200px～ xl: 1536px～
  return (
    <>
      {/* 大枠はContainerで包む、sxはcssにアクセスする maxのブレークポイントを設定
      disableGutters maxWidth={false}でパディング削除 */}
      <Container disableGutters maxWidth={false} sx={{ display: "flex" }}>
        {/* ブラウザーの差異を平均化 */}
        <CssBaseline />
        {/* AppBarがDrawerよりzIndex + 1 */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          {/* disableGutters 左右の端の余白なし */}
          <Toolbar css={toolBar}>
            {/* varient 文字の大きさ  noWrap 文字の折り返しなし sx テーマへのアクセス mr マージンライト */}
            <Typography variant="h3" noWrap sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              HIROBATS
            </Typography>

            {/* md未満の幅になった場合に表示される flexGrow 幅に合わせて伸縮する*/}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" onClick={handleOpenSideMenu}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h5" noWrap sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              HIROBATS
            </Typography>

            {/* ユーザーメニュー */}
            <Box sx={{ flexGrow: 0 }}>
              {/* // Tooltip 吹き出し */}
              <Tooltip title="セッティング">
                {/* p パディング */}
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt={users.name} src={users.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleListItemClick}>
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
            display: { xs: "none", md: "flex" },
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
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

        {/* サイドメニュー md未満の場合はハンバーガーメニューをクリックして表示*/}
        <Drawer
          open={anchorElSide}
          onClose={handleCloseSideMenu}
          sx={{
            display: { xs: "flex", md: "none" },
          }}
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
        <Container maxWidth={false} disableGutters>
          {/* Appnav分の高さを下げる */}
          <Toolbar />
          {/* メッセージ表示エリア */}
          <Box css={messageArea}>
            {/* cssと併記するとrefが効かないため、Boxタグを重ねる */}
            <Box ref={ref}>
              {/* messageの内容をListセットに展開する */}
              {messages.map((e: Message, index) => {
                if (e.channelId === current) {
                  return (
                    <div key={index}>
                      {users.id === e.userId ? (
                        <List>
                          <Container css={messageContainer}>
                            <Avatar alt={users.name} src={users.avatar} />
                            <ListItemText css={balloon} primary={e.text} />
                            <ListItemText primary={e.time} />
                            <Button variant="contained" onClick={() => deleteMessage(e.documentId)}>
                              削除
                            </Button>
                          </Container>
                        </List>
                      ) : (
                        <List>
                          <Container css={messageContainer}>
                            <Avatar alt={users.name} src={users.avatar} />
                            <ListItemText css={balloon} primary={e.text} />
                            <ListItemText primary={e.time} />
                          </Container>
                        </List>
                      )}
                    </div>
                  );
                }
              })}
            </Box>
          </Box>
          {/* テキストエリア */}
          <Box css={textArea}>
            <TextField
              fullWidth
              minRows={2}
              maxRows={2}
              multiline
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value ? (
              <Button fullWidth variant="contained" onClick={handleSubmit}>
                送信する
              </Button>
            ) : (
              <Button fullWidth variant="contained" onClick={handleSubmit} disabled>
                送信する
              </Button>
            )}
          </Box>
        </Container>

        {/* モーダル */}
        <Dialog onClose={handleClickClose} open={open}>
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
