import { notification } from 'antd';

export const  openNotificationWithIcon = (type,message,desecription) => {
    notification[type]({
        message: message,
        description: desecription,
    });
};