import { current } from "@reduxjs/toolkit";

export const statAvg = (grades) => {
  let data = [];
  grades.map((val) => {
    data.push(parseInt(val.result));
  });

  const all = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return Math.floor((all / grades.length / 100) * 160);
};

export const statAvgSubScore = (grades, inner_type) => {
  let data = [];
  grades
    .filter((val) => val.inner_type === inner_type)
    .map((val) => {
      data.push(parseInt(val.result));
    });

  const all = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

 
  return Math.floor((all / data.length) );
};
export const statAvgSubScoreLength = (grades, inner_type) => {

 const data= grades
    .filter((val) => val.inner_type === inner_type)

  return data.length
};

export const scoreAvg = ({l,c,p,comp}) => {
  let compdata = [];
  let ldata = [];
  let cdata = [];
  let pdata = [];
  l.map((val) => {
    ldata.push(parseInt(val.result));
  });
  c.map((val) => {
    cdata.push(parseInt(val.result));
  });
  p.map((val) => {
    pdata.push(parseInt(val.result));
  });
  comp.map((val) => {
    compdata.push(parseInt(val.result));
  });

  const ltotal = ldata.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )/ldata.length;
  const ctotal = cdata.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )/cdata.length;
  const ptotal = pdata.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )/pdata.length;
  const comptotal = compdata.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )/compdata.length;


  // const lAvg= (ltotal*160)/100
  // const cAvg= (ctotal*160)/100
  // const pAvg= (ptotal*160)/100
  // const compAvg= (comptotal*160)/100

  const lAvg= (ltotal/100)*160
  const cAvg= (ctotal/100)*100
  const pAvg= (ptotal/100)*160
  const compAvg= (comptotal/100)*100
     

  return Math.round(((lAvg+cAvg+pAvg+compAvg)/4))
};
