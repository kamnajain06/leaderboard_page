import React, { useEffect } from 'react'
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import BasicTable, { data } from "../Data/data";
import { useTable } from 'react-table'
import { FaArrowTrendUp,FaArrowTrendDown } from "react-icons/fa6";


const LeaderBoard = () => {
    const [slippage, setSlippage] = useState("0%");
    const percentage = [
        { name: "0%" },
        { name: "0.5%" },
        { name: "1%" },
    ]
    function changeHandler(e) {
        [e.target.name] = e.target.value;
        setSlippage(e.target.name);
        console.log(slippage);
    }
    useEffect(()=>{
        setSlippage(slippage);
    },[])
    const Data = React.useMemo(() => data, []);
    const columns = React.useMemo(() => [
        {
            Header: "Id",
            accessor: "number",
        },
        {
            Header: "Rank Name",
            accessor: "RankName",
        },
        {
            Header: "Calmar Ratio",
            accessor: "CalmarRatio",
        },
        {
            Header: "Overall Profit",
            accessor: "OverallProfit",
        },
        {
            Header: "Win% (day)",
            accessor: "win",
        },
        {
            Header: "Avg. Price",
            accessor: "price",
        },
        {
            Header: "Action",
            accessor: "action",
        },
    ], []);

    const PositiveIcon = () => <FaArrowTrendUp className="inline-block ml-2 text-green-700" />;
    const NegativeIcon = () => <FaArrowTrendDown className="inline-block ml-2 text-red-700" />;
    let calmarRatioColIndex = null;

    const { getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
    return (
        <div className='flex w-11/12 justify-center mx-auto h-screen border border-black'>
            <div className='flex flex-col w-full border border-black'>
                <div className='text-4xl font-bold text-center'>LeaderBoard</div>
                <div>
                    <div className='flex w-full justify-between md:mt-[50px] md:px-[10px]'>
                        <div className='text-3xl'>Basic Backtest</div>
                        <div className='flex gap-x-5'>
                            <span>Slippage</span>
                            <div className='flex card justify-content-center mr-[10px]'>
                                <select name={slippage} onChange={()=> changeHandler}>
                                    {
                                        percentage.map((ele,key)=>{
                                            return <option value={ele.name}>{ele.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='md:mt-[10px] flex justify-center '>
                        <table {...getTableProps()}>
                            <thead className='bg-gray-400'>
                                {headerGroups.map((headerGroup, index) => (
                                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column, index) => {
                                            if (column.render('Header') === 'Calmar Ratio') {
                                                calmarRatioColIndex = index;
                                            }
                                            return (
                                                <th className='md:px-7' key={index} {...column.getHeaderProps()} data-col-index={index}>
                                                    {column.render("Header")}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {
                                    rows.map((row, index) => {
                                        prepareRow(row);
                                        return (
                                            <tr key={index} {...row.getRowProps()} className={`${index % 2 === 0 ? 'bg-gradient-to-r from-gray-300 to-gray-100' : 'bg-gray-100'} hover:bg-gradient-to-t hover:from-gray-400 hover:to-gray-600`}>
                                                {
                                                    row.cells.map((cell,cellIndex) => (
                                                        <td key={cellIndex} className='md:px-10 md:py-3' {...cell.getCellProps()}>
                                                        {cell.render("Cell")}
                                                        {calmarRatioColIndex !== null && cellIndex === calmarRatioColIndex && (cell.value > 0 ? <PositiveIcon /> : <NegativeIcon />)}</td>
                                                    ))
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LeaderBoard