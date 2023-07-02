import { toast } from "react-toastify";

const toastSuccess = (msg) => toast(msg);
const toastError = (msg) => toast.error(msg)

export { toastSuccess, toastError }