import "./buslineCreate.css";
import { useState } from 'react';
import { Button, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import BuslineService from "../../services/busline/busline.service";

function BuslineCreate() {
    const [file, setFile] = useState();
    const [direction, setDirection] = useState();
    const [startstop, setStartstop] = useState();
    const [finalstop, setFinalstop] = useState();

    const [voidLoginError, setVoidError] = useState("");

    const validateInput = () => {

    }

    const submitBusline = async () => {
        const formData = new FormData();
        formData.append('direction',direction);
        formData.append('startstop',startstop);
        formData.append('finalstop',finalstop);
        formData.append('file',file);

        BuslineService.create(localStorage.getItem("accessToken"),formData);
    }

    return (
        <div className="container-buslinecreate">
            <h2>Crea línea de guagua</h2>
            <Input placeholder="Direction" value={direction} onChange={(e) => setDirection(e.target.value)} />
            <Input placeholder="Start Stop" value={startstop} onChange={(e) => setStartstop(e.target.value)} />
            <Input placeholder="Final Stop" value={finalstop} onChange={(e) => setFinalstop(e.target.value)} />
            <Input filename={file}
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*" />
            {voidLoginError && <div className="error-mesage">{voidLoginError}</div>}
            <Button className="buttonCreateBusline" type="primary" onClick={submitBusline}>Añadir</Button>
        </div>
    );
}

export default BuslineCreate;