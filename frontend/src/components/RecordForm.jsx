import { useState } from 'react';
import { useRecordContext } from '../hooks/useRecordContext';

const RecordForm = () => {

    const { dispatch } = useRecordContext()
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleDateChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        if (inputName === 'date') {
            setDate(inputValue);
        }
    };

    const handleTimeChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        if (inputName === 'time') {
            setTime(inputValue);
            console.log(time)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let combinedDateTimeString = ''
        if (date && time) {
            combinedDateTimeString = `${date}T${time}:00`;
        }

        let moneyType = ''
        if (type === 'expense') {
            moneyType = 1
        }
        else if (type === 'income') {
            moneyType = 0
        }
        const record = {
            type: moneyType,
            category,
            description,
            amount,
            dateTime: combinedDateTimeString
        };

        const response = await fetch('http://localhost:5000/api/moneyTracker', {
            method: 'POST',
            body: JSON.stringify(record),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setType('')
            setCategory('')
            setDescription('')
            setAmount('')
            setDate('')
            setTime('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_RECORD', payload: json })
            console.log("New record added : ", json)
        }

    };

    return (
        <div className="form-container">
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add new record</h3>
                <label>Type:</label>
                <select
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    className={emptyFields.includes('type') ? 'error' : 'good'}
                >
                    <option value=""></option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <label>Category:</label>
                <input
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className={emptyFields.includes('category') ? 'error' : 'good'}
                />

                <label>Description:</label>
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className={emptyFields.includes('description') ? 'error' : 'good'}
                />

                <label>Amount:</label>
                <input
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    className={emptyFields.includes('amount') ? 'error' : 'good'}
                />

                <label>Date:</label>
                <input
                    type="date"
                    onChange={(e) => handleDateChange(e)}
                    value={date}
                    name='date'
                    className={emptyFields.includes('date') ? 'error' : 'good'}
                />

                <label>Time:</label>
                <input
                    type="time"
                    onChange={(e) => handleTimeChange(e)}
                    value={time}
                    name='time'
                    className={emptyFields.includes('date') ? 'error' : 'good'}
                />

                <button type="submit">Submit</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
};

export default RecordForm;
