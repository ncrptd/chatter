import { toast } from "react-toastify";

const toastSuccess = (msg) => toast(msg);
const toastError = (msg) => toast.error(msg)

const toastPromise = async (promise, pending, success, error) => await toast.promise(promise, {
    pending, success, error
})
export { toastSuccess, toastError, toastPromise }