import React from "react";
import {useSelector, useDispatch} from "react-redux"
import {orderAlfabetic, orderWeight} from "../../redux/actions/index"

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
          if (left.length && right.length) (left[0].weight.imperial.split(" - ")[0])<= (right[0]).weight.imperial.split(" - ")[0]? newArray.push(left.shift()): newArray.push(right.shift())
          else {
            if (left.length) newArray.push(left.shift())
            if (right.length) newArray.push(right.shift())
          }
        }
        return newArray
    }

    function orderDispatch() {
        const inputs = document.getElementsByName("inputOrder")
        let inputChecked
        for (let input of inputs) {
            if (input.checked) {
                inputChecked = input
            }
        }
        const data = [...dogs]
        if (inputChecked.value === "abc") {
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

            dispatch(orderAlfabetic(data))
        }
        else if (inputChecked.value === "weight") {
            // const sortData = [dogs[1]]
            // const sortData = mergeSort(data)
            data.sort((a,b) => {
                if (a.weight.imperial.slice(0,2)-b.weight.imperial.slice(0,2) === 0) {
                    return a.weight.imperial.slice(-2)-b.weight.imperial.slice(-2)
                }
                return a.weight.imperial.slice(0,2)-b.weight.imperial.slice(0,2)
            })
            dispatch(orderWeight(data))
        }
    }

    return <div>
        <h3>Ordenar</h3>
        <label for="inputOrderAbc">Alfaveticamente: </label>
        <input type="radio" name="inputOrder" value="abc" id="inputOrderAbc"></input>
        <label for="inputOrderWeight">Por peso: </label>
        <input type="radio" name="inputOrder" value="weight" id="inputOrderWeight"></input>
        <button onClick={orderDispatch}>Ordenar</button>
    </div>
}

export default Order