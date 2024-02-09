import { useEffect } from "react"
import { useRecordContext } from "../hooks/useRecordContext"

import RecordDetails from '../components/RecordDetails'
import RecordForm from '../components/RecordForm'
import Statistic from '../components/Statistic'
import ChartComponent from '../components/ChartComponent';
import NoGraph from '../assets/no-graph.mp4';

const Home = () => {
    const { records, dispatch } = useRecordContext()

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/moneyTracker');
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_RECORDS', payload: json })
                } else {
                    console.error('Failed to fetch records:', json);
                }
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        }
        fetchRecords()
    }, [])

    return (
        <div className="home">
            <div className="row">
                <div className="intro">
                    <h1>Welcome,</h1>
                    <p>Unleash the power of financial control with our intuitive Money Tracker. Seamlessly manage income and expenses, set personalized goals, and witness your financial dreams come to life. Experience the freedom of informed financial choices and shape a brighter, more prosperous future. Start your financial revolution today – it's time to thrive, not just survive!</p>
                </div>
                {records && <Statistic />}
            </div>
            <h1 id='all-records'>All records</h1>
            <div className="row-section">
                <div id='add-records' className="money-tracker">
                    {records && records.length === 0 && (
                        <div className="no-record">
                            <img
                                src="https://assets-v2.lottiefiles.com/a/0e30b444-117c-11ee-9b0d-0fd3804d46cd/A6t16MXhTI.gif"
                                alt="Empty Records"
                            />
                        </div>
                    )}
                    {records && records.map((record) => (
                        <RecordDetails key={record._id} record={record} />
                    ))}
                    <hr style={{ margin: 'auto 10px', border: '1px solid #777' }} />
                </div>
                <RecordForm />
            </div><br />
            <h1 id="visualise">Visualise</h1>
            <p style={{ textIndent: "50px", marginBottom: "20px" }}>Explore your financial history effortlessly with our insightful charts. The income graph showcases your earnings, while the expense graph tracks your spending patterns. Each point on the graph represents the sum of amounts on a specific day, providing a quick overview of your financial activities. Gain valuable insights, track trends, and stay in control of your finances.</p>
            {records && records.length === 0 && (
                <>
                    <br /><br />
                    <div className="no-graph" >
                        <video
                            src={NoGraph}
                            alt="Empty Records"
                            autoPlay
                            loop
                            muted
                        />
                    </div>
                </>
            )}
            {records && !(records.length === 0) && (
                <>
                    <br /><br />
                    <ChartComponent />
                </>
            )}
            <br /><br /><br />
        </div>
    )
}

export default Home