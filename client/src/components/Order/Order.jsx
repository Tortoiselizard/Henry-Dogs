import React from "react";
import {useSelector, useDispatch} from "react-redux"
import {orderAlfabetic, orderWeight} from "../../redux/actions/index"
import style from "./Order.module.css"

const regNumber = /[^0-9. ]/

function Order() {

    const dogs = useSelector(state => state.dogs)
    const dispatch = useDispatch()

    const mergeSort = (array) => {
        const pivote = Math.round(array.length/2)
        let left = array.slice(0,pivote)
        if (left.length>1) {
          left = mergeSort(left)
        }
        let right = array.slice(pivote)
        if (right.length>1) {
          right = mergeSort(right)
        }
        let newArray = []
        while (left.length || right.length) {
            if (left.length && right.length) {
                
                if (left[0].weight.includes("–")) {
                    left[0].weight = left[0].weight.replace("–","-")
                }
                if (right[0].weight.includes("–")) {
                    right[0].weight = right[0].weight.replace("–", "-")
                }
                
                const r0 = ((regNumber.test(left[0].weight.split("-")[0])? null:(left[0].weight.split("-")[0])) - (regNumber.test(right[0].weight.split("-")[0])? null:(right[0].weight.split("-")[0])))
                
                
                if (r0 < 0) {
                    newArray.push(left.shift())
                } else if (r0 > 0){
                    newArray.push(right.shift())
                } 
                else {
                    
                    const r1 = (regNumber.test(left[0].weight.split("-")[1])? null:Number(left[0].weight.split("-")[1])) - (regNumber.test(right[0].weight.split("-")[1])? null:Number(right[0].weight.split("-")[1]))
                    
                    
                    if (r1 <= 0) {
                        newArray.push(left.shift())
                    }
                    else {
                        newArray.push(right.shift())
                    }
                }
            }
            else {
                if (left.length) newArray.push(left.shift())
                if (right.length) newArray.push(right.shift())
            }
        }
        return newArray
    }

    function orderDispatch() {
        const inputsOrder = document.getElementsByName("inputOrder")
        const inputSence = document.getElementsByName("inputOrderSence")
        const data = [...dogs]
        let inputCheckedOrder
        for (let input of inputsOrder) {
            if (input.checked) {
                inputCheckedOrder = input
                break
            }
        }
        let inputCheckedSence
        for (let input of inputSence) {
            if (input.checked) {
                inputCheckedSence = input
                break
            }
        }
        
        if (inputCheckedOrder && inputCheckedOrder.value === "weight") {
            // const sortData = [dogs[1]]
            const sortData = mergeSort(data)
            // data.sort((a,b) => {
            //     if ((regNumber.test(a.weight.metric.split(" - ")[0])? null: Number(a.weight.metric.split(" - ")[0]))-(regNumber.test(b.weight.metric.split(" - ")[0])? null:Number(b.weight.metric.split(" - ")[0])) === 0) {
            //         return (regNumber.test(a.weight.metric.split(" - ")[1])? null:Number(a.weight.metric.split(" - ")[1]))-(regNumber.test(b.weight.metric.split(" - ")[1])? null:Number(b.weight.metric.split(" - ")[1]))
            //     }
            //     return (regNumber.test(a.weight.metric.split(" - ")[0])? null:Number(a.weight.metric.split(" - ")[0]))-(regNumber.test(b.weight.metric.split(" - ")[0])? null:Number(b.weight.metric.split(" - ")[0]))
            // })
            inputCheckedSence && inputCheckedSence.value==="des"?dispatch(orderWeight(sortData.reverse())):
            dispatch(orderWeight(sortData))
        }
        else {
            data.sort((a,b) => {
                for (let i = 0; i<(a.name.length<b.name.length?b.name.length:a.name.length); i++) {
                    if (a.name.charCodeAt(i)-b.name.charCodeAt(i)===0) {
                        continue
                    }
                    return (a.name? a.name.charCodeAt(i):null)-(b.name? b.name.charCodeAt(i):null)
                }
            })
            // const sortData = dogs.sort((a,b) => {
            //     const wordA = a.name.toLowerCase()
            //     const wordB = b.name.toLowerCase()
            //     for (let i = 0; i < (wordA.length<wordB.length?wordA.length:wordB.length) ; i++) {
            //         if (wordA.charCodeAt(i)<wordB.charCodeAt(i)) return -1
            //         else if (wordA.charCodeAt(i)>wordB.charCodeAt(i)) return 1
            //     }
            //     return 0
            // })
            inputCheckedSence && inputCheckedSence.value==="des"?dispatch(orderAlfabetic(data.reverse())):
            dispatch(orderAlfabetic(data))
        }
    }

    return <div className={style.Order}>
        <p>Ordenar por: </p>

        <div>
            <label for="inputOrderAbc">Alfaveticamente</label>
            <input type="radio" name="inputOrder" value="abc" id="inputOrderAbc"></input>
            <br></br>
            <label for="inputOrderWeight">Peso</label>
            <input type="radio" name="inputOrder" value="weight" id="inputOrderWeight"></input>
        </div>

        <div className={style.sentido}>
        <p>Sentido: </p>
        <label for="inputOrderAsc">Ascendente</label>
        <input type="radio" id="inputOrderAsc" name="inputOrderSence" value="asc"></input>
        <br></br>
        <label for="inputOrderDes">Descendente</label>
        <input type="radio" id="inputOrderDes" name="inputOrderSence" value="des"></input>
        </div>
        
        <button onClick={orderDispatch} className={style.botonOrdenar}>Ordenar</button>
    </div>
}

export default Order