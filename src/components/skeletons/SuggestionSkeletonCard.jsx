
export default function SuggestionSkeletonCard({ num, hide }) {
  return Array(num)
    .fill(0)
    .map((item, i) => (
      <div className="flex justify-between items-center" key={i}>
        <div className="flex gap-2 justify-center items-center">
          <div className="w-10 h-10 skeleton round"></div>
          {!hide && <div>
            <p className="py-2 px-8 skeleton mb-2"></p>
            <p className="py-2 skeleton"></p>
          </div>}
        </div>
        <div>
          <button className=" py-1 px-4 h-8 w-20 skeleton button "></button>
        </div>
      </div>
    ));
}
