import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useRecordContext } from '../hooks/useRecordContext';
import { Chart as ChartJS } from 'chart.js/auto';

const DualLineChart = () => {
    const { records } = useRecordContext();
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef(null);
    const visualiseRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (chartRef.current) {
                            chartRef.current.chartInstance.update();
                        }
                    } else {
                        setIsVisible(false);
                    }
                });
            },
            { threshold: [0, 0.5] }
        );

        observer.observe(visualiseRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    const uniqueDates = Array.from(new Set(records.map((data) => formatDate(data.date))));
    uniqueDates.sort();

    const incomeData = prepareChartData(records, 0, uniqueDates);
    const expenseData = prepareChartData(records, 1, uniqueDates);

    const incomeChartData = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: 'green',
                fill: false,
            },
        ],
    };

    const expenseChartData = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Expense',
                data: expenseData,
                borderColor: 'red',
                fill: false,
            },
        ],
    };

    return (
        <div className={`chart-container ${isVisible ? 'fade-in' : 'hide'}`}>
            <div className='chart-row'>
                <div>
                    <Line data={incomeChartData} ref={chartRef} />
                </div>
                <div ref={visualiseRef}></div>
                <div>
                    <Line data={expenseChartData} />
                </div>
            </div>
        </div>
    );
};

function prepareChartData(records, type, uniqueDates) {
    return uniqueDates.map((date) => {
        const filteredRecords = records.filter(
            (record) => record.type === type && formatDate(record.date) === date
        );
        return filteredRecords.reduce((total, record) => total + record.amount, 0);
    });
}

function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
}

export default DualLineChart;