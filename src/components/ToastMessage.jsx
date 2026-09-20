import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissNotification } from "../redux/features/collectionSlice";

const ToastMessage = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.collection.notification);

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = setTimeout(() => {
      dispatch(dismissNotification());
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div
      className={`toast-message ${
        notification.type === "success" ? "toast-success" : "toast-danger"
      }`}
      role="status"
    >
      {notification.message}
    </div>
  );
};

export default ToastMessage;
