import { ethers } from "ethers";
import { useEffect, useState } from "react";
import SingleResult from "./ResultSample";

const TestResult = ({ account, waterInfoContract }) => {

    const [result, setResult] = useState();
    const [waterName, setWaterName] = useState("");
    const [waterPH, setWaterPH] = useState("");
    const [waterTemp, setWaterTemp] = useState("");
    const [waterPhos, setWaterPhos] = useState("");
    const [waterTDS, setWaterTDS] = useState("");
    const [testerNote, setTesterNote] = useState("");

    const getResult = async () => {
        if (!waterInfoContract || account) return;

        const results = await waterInfoContract.getInformation();

        setResult(() => {
            return results.map((w) => (
                {
                    name: w.name,
                    phLevel: w.phLevel,
                    temperature: w.temperature,
                    phosphates: w.phosphates,
                    totalDissolvedSolids: w.totalDissolvedSolids,
                    note: w.note,
                    timestamp: w.timestamp,
                    testerAddress: w.testerAddress
                }
            ));
        }

        );
    };
        const postResult = async () => {
            if (!waterInfoContract) return;
            try {
              const post = await waterInfoContract.createInputTest(waterName, waterPH, waterTemp,waterPhos,waterTDS,testerNote);
              await post.wait();
              
            } catch (e) {
              console.warn("Transaction failed with error", e);
            } finally {
              window.location.reload();
            }
          };

    useEffect(() => {
        console.log(waterInfoContract);
        if (!waterInfoContract || result) return;
        getResult();
    }, [waterInfoContract]);

    return (
        <div className="table-wrapper">
           (
                <h1 className="heading1">Labaratory water test results</h1>
            )
            {account && result && result.length === 0 && (
                <p className="state-message">There is no water test results to display</p>
            )}
            {result &&
                result.length > 0 &&
                <table className="styled-table">
                    <thead>

                        <tr>
                            <th>Water Name</th>
                            <th>Water PH Level</th>
                            <th>Water Temperature</th>
                            <th>Phosphates in water</th>
                            <th>Total Dissolved Solids in water</th>
                            <th>Testers note</th>
                            <th>Date</th>
                            <th>Tester</th>
                        </tr>
                    </thead>

                    {
                        result.slice(0).reverse().map((m, i) => (
                            <SingleResult
                                key={i}
                                name={m.name}
                                phLevel={m.phLevel}
                                temperature={m.temperature}
                                phosphates={m.phosphates}
                                timestamp={m.timestamp}
                                totalDissolvedSolids={m.totalDissolvedSolids}
                                note={m.note}
                                date = {m.timestamp}
                                testerAddress={m.testerAddress}
                            />

                        ))}
                        {account &&
                        <tr>
                        <td><input placeholder="Water Name" value={waterName} onChange={(e)=>{setWaterName(e.target.value)}}></input></td>
                        <td><input placeholder="Water PH Level" value={waterPH} onChange={(e)=>{setWaterPH(e.target.value)}}></input></td>
                        <td><input placeholder="Water Temperature" value={waterTemp} onChange={(e)=>{setWaterTemp(e.target.value)}}></input></td>
                        <td><input placeholder="Phosphates in water" value={waterPhos} onChange={(e)=>{setWaterPhos(e.target.value)}}></input></td>
                        <td><input placeholder="Total dissolved solids" value={waterTDS} onChange={(e)=>{setWaterTDS(e.target.value)}}></input></td>
                        <td><input placeholder="Testers note" value={testerNote} onChange={(e)=>{setTesterNote(e.target.value)}}></input></td>
                        <td >Current Time</td>
                        <td >Labaratory Address</td>
                    </tr>
                        }
                                        </table>

            }
            {account &&
            <button className="button post-info" onClick={postResult}>Post</button>
            }            
            
            <div>
            </div>
        </div>
        
        
    );
};


export default TestResult;