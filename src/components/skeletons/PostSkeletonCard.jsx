import './styles.css';
export default function PostSkeletonCard() {
  return Array(5)
    .fill(0)
    .map((item, i) => (
      <div className=" p-4 w-full  border-x border-b border-slate-500" key={i}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 ">
            <div className="w-10 h-10 rounded-full skeleton round"></div>
            <p className="py-2 px-8 skeleton">{/* username  */}</p>
            <p className="py-2 px-10 skeleton">{/* date? */}</p>
          </div>
          <p className="py-1 px-3 skeleton">{/* date? */}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className=" w-2/4 py-2 px-12 skeleton">{/* content  */}</p>
          <p className=" w-3/4 py-2 px-12 skeleton">{/* content  */}</p>
          <p className=" w-3/4 py-2 px-12 skeleton">{/* content  */}</p>
        </div>
      </div>
    ));
}
