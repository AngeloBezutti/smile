import React, { useState } from 'react'
import {
    Button,
    Grid,
    TextField,
}
    from '@material-ui/core';
import Firebase from '../../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';

export default function Registro(props) {

    const [procedimento, setProcedimento] = useState("")
    const [paciente, setPaciente] = useState("")
    const [data, setData] = useState("")

    const limpar = () => {
        setProcedimento("")
        setPaciente("")
        setData("")
    }

    const salvarRegistro = () => {

        let objeto = {
            procedimento: procedimento,
            paciente: paciente,
            data: data
        }
        let code = uuidv4()

        Firebase
            .database()
            .ref(`procedimentos/${code}`)
            .set(objeto)
            .then(() => {
                limpar()
            })
            .catch((erro) => {
                console.log(erro)
            })
    }

    return (
        <Grid container spacing={0} >
            <Grid item sm={10} xs={12}>
                <TextField
                    label="Paciente"
                    variant="outlined"
                    value={paciente}
                    onChange={(e) => setPaciente(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10, marginTop: 20 }} />

                <TextField
                    label="Procedimento"
                    variant="outlined"
                    value={procedimento}
                    onChange={(e) => setProcedimento(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />

                <TextField
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    label="Data e Hora"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={salvarRegistro}
                    style={{ float: "right" }}>
                    Salvar
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.setScreen(1)}
                    style={{ float: "right" }}>
                    Cancelar
                </Button>
            </Grid>
        </Grid >

    )
}
