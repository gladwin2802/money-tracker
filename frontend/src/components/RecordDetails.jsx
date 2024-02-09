import { useRecordContext } from "../hooks/useRecordContext"
import { LuIndianRupee } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { BiSolidUpArrowCircle } from "react-icons/bi";
import { BiSolidDownArrowCircle } from "react-icons/bi";

const RecordDetails = ({ record }) => {
    const { dispatch } = useRecordContext()
    const dateObject = new Date(record.date);

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const handleClick = async () => {
        console.log(record)
        const response = await fetch('http://localhost:5000/api/moneyTracker/' + record._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_RECORD', payload: json })
        }
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formattedDateTime = dateObject.toLocaleString(undefined, options);

    return (
        <div className="record-details">
            <div className="row">
                {record.type === 1 ? <h4 className='expense'>Expense</h4> : <h4 className='income'>Income</h4>}
                <LuTrash2 className="delete" onClick={handleClick} />
            </div>
            <h5>{capitalize(record.category)}</h5>
            <p className="description">{record.description}</p>
            <div className="row">
                <div className="row">
                    <LuIndianRupee className="sign" />
                    <p className="amount"> {record.amount}</p>
                    {record.type === 1 ? <BiSolidDownArrowCircle className='mini-down'/> : <BiSolidUpArrowCircle className='mini-up'/>}
                </div>
                <p className="datetime">{formattedDateTime}</p>
            </div>

        </div>
    );
}

export default RecordDetails;
