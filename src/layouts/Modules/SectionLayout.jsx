import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BookOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, notification, Tabs, Grid, Skeleton } from "antd";
import "./index.css";
import { Link, Outlet } from "react-router-dom";
import IconWritingSign from "../../Assets/SVG/IconWritingSign";
import { useDispatch, useSelector } from "react-redux";
import { CloseNotification } from "../../redux/actions";
import { getBookmarkList } from "../../redux/slices/bookmark";
import { getStatDuolingo } from "../../redux/slices/statistic";
import { setEvPermissionData } from "../../redux/slices/subscription";
import { SmileOutlined,ExclamationOutlined,CheckOutlined  } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

export default function SectionLayout() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [collapsed, setCollapsed] = useState(true);
  const { common } = useSelector((state) => state.app);
  const { userInfo } = useSelector((state) => state.auth);
  const { statWriting, statSpeaking } = useSelector((state) => state.statistic);
  const subscription_type = useSelector((state) => state.subscription);
  const [busy, isBusy] = useState(true);

  useEffect(() => {
    dispatch(getStatDuolingo());
    dispatch(getBookmarkList());
    // check first if it is duolingo subscriptions then pass
    dispatch(
      setEvPermissionData({
        subscription_type: userInfo.subscription_type,
        ev_question_attempt: statWriting.length + statSpeaking.length,
      })
    );
    isBusy(false);
  }, []);

  useEffect(() => {
   
    if (common?.message && common.severity !== 'error') {
       openNotificationWithIcon(common.severity);
    }
      dispatch(CloseNotification());
  }, [common?.message]);

  const openNotificationWithIcon = (type) => {
    api.open({
      message:  common.severity ==='Attention'? <strong className="text-yellow-400">{common.severity}</strong>:'',
      description: common.message,
      placement: "top",
      icon: (
        common.severity ==='Attention'?
        <ExclamationOutlined style={{
          color: 'yellow',
        }}></ExclamationOutlined>:
        <CheckOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  };

  return (
    <div>
      {busy ? (
        <Skeleton></Skeleton>
      ) : (
        <Layout className="bg-#e0ebf8 h-auto m-auto w-full">
          {contextHolder}
          <Sider
            className={`${collapsed ? "hidden" : "block"}`}
            trigger={null}
            collapsible
            translate="3s"
            collapsed={false}
            style={{ background: "#e0ebf8" }}
          >
            <div className=" h-auto" />
            <Menu
              theme="light"
              mode="inline"
              className="md:mt-[5rem] bg-transparent"
              defaultSelectedKeys={["1"]}
              inlineCollapsed={collapsed}
              items={[
                {
                  label: (
                    <a href="/" rel="noopener noreferrer">
                      Home
                    </a>
                  ),
                  key: "home",
                  icon: <HomeOutlined />,
                },
                {
                  label: "Practice",
                  key: "access-control",
                  icon: <IconWritingSign></IconWritingSign>,
                  collapsed: "block",

                  children: [
                    {
                      label: (
                        <a
                          href="/duolingo/module/vocabulary"
                          rel="noopener noreferrer"
                        >
                          Vocabulary
                        </a>
                      ),
                      path: "duolingo/module/reading",
                      key: "user2",
                      permission: "user list",
                    },
                    {
                      label: (
                        <a
                          href="/duolingo/module/reading"
                          rel="noopener noreferrer"
                        >
                          Reading
                        </a>
                      ),
                      path: "/module/reading",
                      key: "user",
                      permission: "user list",
                    },
                    {
                      label: (
                        <a
                          href="/duolingo/module/writing"
                          rel="noopener noreferrer"
                        >
                          Writing
                        </a>
                      ),
                      path: "/module/writing",
                      key: "role1",
                    },
                    {
                      label: (
                        <a
                          href="/duolingo/module/speaking"
                          rel="noopener noreferrer"
                        >
                          Speaking
                        </a>
                      ),
                      path: "/module/writing",
                      key: "role2",
                    },
                    {
                      label: (
                        <a
                          href="/duolingo/module/listening"
                          rel="noopener noreferrer"
                        >
                          Listening
                        </a>
                      ),
                      path: "/module/writing",
                      key: "role3",
                    },
                    // {
                    //   label: (
                    //     <a
                    //     className="font-bold"
                    //       href="/duolingo/module/mock-test"
                    //       rel="noopener noreferrer"
                    //     >
                    //       Mock Test
                    //     </a>
                    //   ),
                    //   path: "/module/mock-test",
                    //   key: "role4",
                    // },
                  ],
                },
                {
                  label: (
                    <a href="/materials" rel="noopener noreferrer">
                      Materials
                    </a>
                  ),
                  key: "materials",
                  icon: <BookOutlined />,
                },
                {
                  label: (
                    <a href="/progress" rel="noopener noreferrer">
                      My progress
                    </a>
                  ),
                  key: "progress",
                  icon: <TableOutlined />,
                },
              ]}
            ></Menu>
          </Sider>
          <Layout>
            <Header
              className="flex justify-between z-50"
              style={{
                padding: 0,
                background: "#e0ebf8",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <title
                className="sm:text-[30px] md:text-[40px]  bg-gradient-to-r
         from-blue-600 via-green-600 to-indigo-500 inline-block text-transparent bg-clip-text
          text-center text-[22px] font-lobster font-[700] drop-shadow-md w-auto"
              >
                <Link to={"/"}>PracticeCompanions</Link>
              </title>
              <div></div>
            </Header>
            <div className="h-auto bg-[#eff2f69a]">
              <div className="md:w-[90%] sm:w-full m-auto mt-5 relative ">
                <Outlet></Outlet>
              </div>
            </div>
          </Layout>
        </Layout>
      )}
    </div>
  );
}
