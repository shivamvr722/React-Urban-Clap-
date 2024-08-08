import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideFill } from "react-icons/ri";

const TableHead = (props) => {
  return <th onClick={() => props.setOrderField(props.orderField === `-${props.name}` ? `${props.name}` : `-${props.name}`)} ><span className={props.provider ? "flex xflex text-center max-w-[112px]" : "flex xflex text-center"}> {props.titleName}&nbsp;&nbsp;{props.orderField === `-${props.name}` ? <span className="max-w-3 p-0 m-0" ><RiArrowDownWideFill /></span> : <span className="max-w-3 p-0 m-0" ><RiArrowUpWideFill /></span>} </span></th>
}

export default TableHead