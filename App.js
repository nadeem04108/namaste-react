const parent = React.createElement(
    "div",
    {id:"parent"},
    [
        React.createElement("div",{id:"child"},
        [React.createElement("h1",{},"I  am h1 tag"),
        React.createElement("h2",{},"I  am h2 tag")
        ]),
        React.createElement("div",{id:"child2"},
        [
        React.createElement("h1",{},"I  am h3 tag"),
        React.createElement("h2",{},"I  am h4 tag")
        ]
    )]

);


//JSX

//Reactelement(object)=>HTML(browser understands)

// const heading = React.createElement(
//     "h1",
//     {id:"heading",className:"heading-class"},
//     "NAMASTE JAVASCRIPT BY NADEEM"
// );
console.log(parent);//object

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(parent);


//render method is basically convert this oject to h1 tag  and put in over here 