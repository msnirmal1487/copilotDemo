
import { useState, createElement } from 'react';

// Create h1 and h2 elements, save them to variables and render them inside the app div
const h1 = createElement('h1', null, 'Hello World');
const h2 = <h2>Hello World (babel / JAX syntax)</h2>;
// React component that returns a h3 element
function Header3() {
    return <h3>Hello World (as a React component function)</h3>;
}
// React H3 component that accepts a prop for title
function Header3WithProps(props) {
    // print props to console
    console.log(props);
    // return a h3 element with the title prop
    return <h3>{props.title}</h3>;
}
// React H3 component that accepts a prop for title
function Header3WithPropsDestructuringAndDefaultTitle({title}) {
    // return a h3 element with the title prop
    return <h3>{title ? title : 'Default Title'}</h3>;
}

export default function HomePage() {
    // use state
    const [likes, setLikes] = useState(0);

    const loopThrough = ["loop", "through", "this", "array"]
    function handleClick() {
        setLikes(likes + 1);
        console.log('Increment Like count to '+ likes);
    }
    return (
        <div>
            {h1}
            {h2}
            <Header3 />
            <Header3WithProps title="Title passed as prop (child to parent)" />
            <Header3WithPropsDestructuringAndDefaultTitle />
            <Header3WithPropsDestructuringAndDefaultTitle title='destructuring'/>
            <ul>
                {loopThrough.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>
            <ul>
                {loopThrough.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <button onClick={handleClick}>Like({likes})</button>
        </div>
    );
}


