function _1(md){return(
md`#  React Roadmap Chart

Roadmap visualization for depicting the roadmap flow for react js.`
)}

function _chart(DOM,createChart)
{
  const elem = DOM.element("div");
  elem.id = "chart-container";

  // let divModalOverlay = html`<div class="modal-overlay" id="my-modal-overlay"></div>`;
  // elem.appendChild(divModalOverlay);
  // divModalOverlay.classList.toggle("closed");

  // let divModal = html`<div class="modal" id="my-modal">
  //   <button class="close-button" id="close-button">&times;</button>
  //   <div class="modal-guts">
  //     <h1>Modal Example</h1>

  //   </div>
  // </div>`;
  // divModal.classList.toggle("closed");
  // elem.appendChild(divModal);

  // d3.select(divModal)
  //   .select("#close-button")
  //   .on("click", () => {
  //     d3.select("#my-modal").node().classList.toggle("closed");
  //     d3.select("#my-modal-overlay").node().classList.toggle("closed");
  //   });

  createChart(elem);

  return elem;
}


function _createChart(d3,height,width,data){return(
function createChart(parent) {
  const svg = d3
    .select(parent)
    .append("svg")
    .attr("width", "100%")
    .attr("height", height)
    .attr("viewBox", [-10, -10, width + 20, height]);
  const curve = d3.line().curve(d3.curveNatural);

  svg
    .selectAll("#path")
    .data(data)
    .join("path")
    .attr("id", "path")
    .attr("fill", "none")
    .attr("stroke", (d) => d.color)
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-dasharray", (d) => (d.children ? "0" : "5,5"))
    .attr("d", (d) => {
      console.log(d.curvePoints);
      return curve(d.curvePoints);
    });
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.w)
    .attr("height", (d) => d.h)
    .attr("fill", (d) =>
      d.children ? "rgb(255, 255, 0)" : "rgb(255, 229, 153)"
    )
    .attr("stroke", (d) => "gray")
    .attr("stroke-width", 2);
  // .on("click", (i, d) => {
  //   console.log(d);
  //   d3.select("#my-modal").node().classList.toggle("closed");
  //   d3.select("#my-modal-overlay").node().classList.toggle("closed");
  //   d3.select("#my-modal").select("h1").text(d.val);
  //   d3.event.stopPropagation();
  // });

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => d.x + d.w / 2)
    .attr("y", (d) => d.y + d.h / 2)
    .attr("dy", ".35em")
    .text((d) => d.val)
    .attr("fill", "black")
    .attr("text-anchor", "middle");

  return svg.node();
}
)}

function _config(){return(
{
  type: "FE",
  children: [
    {
      val: "Fundamentals",
      color: "#2b78e4",
      children: [
        { val: "JSX", color: "#2b78e4" },
        { val: "Components", color: "#2b78e4" },
        { val: "Composition", color: "#2b78e4" },
        { val: "React Hooks", color: "#2b78e4" },
        { val: "Create React APP", color: "#2b78e4" },
        { val: "Props vs State", color: "#2b78e4" },
        { val: "List & Keys", color: "#2b78e4" },
        { val: "Conditional Rendering", color: "#2b78e4" },
        { val: "Component Life Cycle", color: "#2b78e4" }
      ]
    },
    {
      val: "Advanced",
      color: "red",
      children: [
        { val: "Custom Hooks", color: "red" },
        { val: "Context", color: "red" },
        { val: "Refs", color: "red" },
        { val: "HOC", color: "red" },
        { val: "Custom Hooks", color: "red" },
        { val: "Portals", color: "red" },
        { val: "Error Boundary", color: "red" }
      ]
    },
    {
      val: "Ecosystem",
      color: "green",
      children: [
        { val: "Routers", color: "green" },
        { val: "Forms", color: "green" },
        { val: "State Management", color: "green" },
        { val: "Styling", color: "green" },
        { val: "Mobile", color: "green" },
        { val: "API Calls", color: "green" },
        { val: "SSR", color: "green" }
      ]
    }
  ]
}
)}

function _data(transformData,roadmapper,config){return(
transformData(roadmapper(config.children))
)}

function _roadmapper(width,getRoadmapCurve){return(
function roadmapper(data, parent) {
  console.log("date", data);
  const W = 150;
  const rh = 30;
  const rOffset = 100;
  let lastY = 0;
  return data.reduce((final, current, index) => {
    const rw = Math.max(150, current.val.length * 10);
    if (parent) {
      const updatedX = (index + 1) % 2 == 1 ? 0 : width - rw;
      const updatedY =
        (index + 1) % 2 == 1
          ? parent.y + (index / 2) * rOffset
          : final[final.length - 1].y;
      console.log(final, parent, current);
      const updatedCurrent = {
        val: current.val,
        color: current.color,
        y: updatedY,
        x: updatedX,
        h: rh,
        w: rw,
        px: parent.x,
        py: parent.y,
        curvePoints: [
          (index + 1) % 2 == 1
            ? [parent.x, parent.y + rh / 2]
            : [parent.x + parent.w, parent.y + rh / 2],
          (index + 1) % 2 == 1
            ? [updatedX + rw, updatedY + rh / 2]
            : [updatedX, updatedY + rh / 2]
        ]
      };
      return [...final, updatedCurrent];
    }
    const updatedX = width / 2 - rw / 2;
    const updatedY = lastY + rOffset;
    const updatedCurrent = {
      val: current.val,
      color: current.color,
      y: updatedY,
      x: updatedX,
      h: rh,
      w: rw,
      px: final[index - 1]?.x || null,
      py: final[index - 1]?.y || null,
      curvePoints: final[index - 1]
        ? getRoadmapCurve([
            [
              final[index - 1]?.x + rw / 2 || null,
              final[index - 1]?.y + rh || null
            ],
            [updatedX + rw / 2, updatedY]
          ])
        : []
    };
    lastY = updatedY;

    if (current.children) {
      const childNode = roadmapper(current.children, updatedCurrent);
      lastY = childNode[childNode?.length - 1].y;
      return [...final, { ...updatedCurrent, children: childNode }];
    }
    return [...final, updatedCurrent];
  }, []);
}
)}

function _transformData(){return(
(data) =>
  data.reduce((final, current) => {
    return current.children
      ? [...final, current, ...current.children]
      : [...final, current];
  }, [])
)}

function _getRoadmapCurve(){return(
(val) => {
  const [p1, p2] = val;
  const diff = p2[1] - p1[1];
  const offsetY = diff / 3;
  const offsetX = 20;
  return [
    p1,
    [p1[0] + offsetX, p1[1] + offsetY],
    [p1[0] - offsetX, p1[1] + 2 * offsetY],
    p2
  ];
  console.log(diff);
}
)}

function _line(d3){return(
d3
  .line()
  .x((d) => d.x)
  .y((d) => d.y)
)}

function _myCSSStyle(html){return(
html`<style>
#chart-container {
  width: ;
  height: auto;
  /*position: fixed;*/
  top: 0;
  left: 0;
  /*overflow-y: scroll;*/
}

.modal {
  /* This way it could be display flex or grid or whatever also. */
  display: block;
  
  /* Probably need media queries here */
  width: 600px;
  max-width: 100%;
  
  height: 400px;
  max-height: 100%;
  
  /* it was fixed in the original example, but it doesn't seem to work correctly on Observable */
  position: absolute;
  
  z-index: 100;
  
  left: 50%;
  top: 50%;
  
  /* Use this for centering if unknown width/height */
  transform: translate(-50%, -50%);
  
  /* If known, negative margins are probably better (less chance of blurry text). */
  /* margin: -200px 0 0 -200px; */
  
  background: white;
  box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);
}
.closed {
  display: none;
}

.modal-overlay {
  /* it was fixed in the original example, but it doesn't seem to work correctly on Observable */
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  
  background: rgba(0, 0, 0, 0.6);
}



.modal .close-button {
  cursor: pointer;

  position: absolute;
  
  /* don't need to go crazy with z-index here, just sits over .modal-guts */
  z-index: 1;
  
  top: 20px;
  
  /* needs to look OK with or without scrollbar */
  right: 20px;
  
  border: 0;
  background: black;
  color: white;
  padding: 5px 10px;
  font-size: 1.3rem;
}

.fadeIn {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.fadeOut {
	opacity: 0;
  display: none;
	animation-name: fadeOutOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in;
	animation-duration: 0.5s;
}

@keyframes fadeOutOpacity {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
    display: none;
	}
}
`
)}

function _myStyle(){return(
""
)}

function _initCSS(myStyle){return(
function () {
  if (myStyle.length === 0) {
    return;
  }

  var style = document.createElement("style");
  style.type = "text/css";
  style.innerText = myStyle;
  return document.getElementsByTagName("head")[0].appendChild(style);
}
)}

function _width(){return(
700
)}

function _height(){return(
1400
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["DOM","createChart"], _chart);
  main.variable(observer("createChart")).define("createChart", ["d3","height","width","data"], _createChart);
  main.variable(observer("config")).define("config", _config);
  main.variable(observer("data")).define("data", ["transformData","roadmapper","config"], _data);
  main.variable(observer("roadmapper")).define("roadmapper", ["width","getRoadmapCurve"], _roadmapper);
  main.variable(observer("transformData")).define("transformData", _transformData);
  main.variable(observer("getRoadmapCurve")).define("getRoadmapCurve", _getRoadmapCurve);
  main.variable(observer("line")).define("line", ["d3"], _line);
  main.variable(observer("myCSSStyle")).define("myCSSStyle", ["html"], _myCSSStyle);
  main.variable(observer("myStyle")).define("myStyle", _myStyle);
  main.variable(observer("initCSS")).define("initCSS", ["myStyle"], _initCSS);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  return main;
}
