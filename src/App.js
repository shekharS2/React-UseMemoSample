import { useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {
	// Two common use cases of useMemo:
	// 1. When you want to make a slow function wrap inside useMemo so that doesn't re-compute every single time you render your component and it only computed when you acually need the value from that function since the inputs actually change
	// 2. Whenever you want to make sure the reference of an object or an array is exactly the same as it was the last time you rendered if none of the internal workings changed, you're gonna want to useMemo here to make sure that you only update the reference of that object whenever the actual contents of the object change instead of updating every single time you render
	
	const [number, setNumber] = useState(0);
	const [textColor, setTextColor] = useState();

	// without useMemo : computes result even when 'Change Theme' button is clicked, i.e., every time component re-renders
	// with useMemo : computes result only when input changes, i.e, when 'number' state is changed
	const tripleNumber = useMemo(() => someVerySlowFunction(number), [number]);
	
	const divStyle = useMemo(() => {
		return {
			width: '100px',
			height: '20px',
			backgroundColor: textColor ? 'white' : 'black',
			color: textColor ? 'black' : 'white'
		};
	}, [textColor]);

	// without useMemo : prints log statement even when data 'number' state changes, i.e., every time component re-renders
	// with useMemo : prints log statement only when 'Change Theme' button is clicked, i.e, when 'textColor' state changes
	useEffect(() => {
		console.log('Theme Changed'); 
	}, [divStyle]);
	
	
	return <>
		<input type='number' min={0} defaultValue={0} onChange={e => setNumber(parseInt(e.target.value))} ></input>
		<button onClick={() => setTextColor(prev => !prev)} >Change Theme</button>
		<div style={divStyle} >{tripleNumber ? tripleNumber : ''}</div>
	</>;
}

const someVerySlowFunction = (num) => {
	for(let i = 0; i < 1000000000; i++){}
	return num * 3;
}

export default App;
