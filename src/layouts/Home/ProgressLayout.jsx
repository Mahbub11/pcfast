import { Skeleton,notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../Components/Home/Header";
import { getUserInfo, getUserProfileInfo } from "../../redux/slices/auth";
import { CloseNotification } from "../../redux/actions";
import { getStatDuolingo } from "../../redux/slices/statistic";

export default function ProgressLayout() {
  const dispatch = useDispatch();
  let [visible, setVisiable] = useState(1);
  const [api, contextHolder] = notification.useNotification(); 
  let location = useLocation();
  const [busy, isBusy] = useState(true);
  const { common } = useSelector((state) => state.app);
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: common.severity,
      description:common.message,
      placement:'top',
       
    });
  };

  useEffect(()=>{
    dispatch( CloseNotification())
    if(common.message){
     openNotificationWithIcon(common.severity)
 
   
    }
    
   },[common.message])

  useEffect(() => {
    setVisiable(++visible);
  }, [location]);

  useEffect(() => {
    dispatch(getUserProfileInfo());
    dispatch(getUserInfo())
    dispatch(getStatDuolingo())
    isBusy(false)
  }, [busy]);


  return (
    <div className="w-full h-auto sm:h-screen">
      <div className="">
        <Header></Header>

        <div>
          {busy ? (
            <Skeleton></Skeleton>
          ) : (
            <div className={`${common.blury ? "blur-sm" : ""} mt-10`}>
               {contextHolder}
              <Outlet></Outlet>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
