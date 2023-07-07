import React, { useState } from "react";
import "./css/main.css";
//import moment from "moment";
//import "moment/locale/ru";


function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

const HighlightNew = (Component) => {
  function View(props) {
    if (props.views >= 1000) {
      return (
        <Popular>
          <Component {...props} />
        </Popular>
      );
    } else if (props.views < 100) {
      return (
        <New>
          <Component {...props} />
        </New>
      );
    } else {
      return <Component {...props} />;
    }
  }
  return View;
};

function Article(props) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}
function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

const HighNewVideo = HighlightNew(Video);
const HighNewArticle = HighlightNew(Article);

function List(props) {
  return props.list.map((item) => {
    switch (item.type) {
      case "video":
        return <HighNewVideo {...item} />;

      case "article":
        return <HighNewArticle {...item} />;
    }
  });
}

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}


// function DateTime(props) {
//   return <p className="date">{props.date}</p>;
// }

// const Data = (Component) => {
//   function Date(props) {
//     let now = moment();
//     let end = moment(props.date);
//     let minutes = now.diff(end, "minutes");
//     let hours = now.diff(end, "hours");
//     let days = now.diff(end, "days");
//     let new_date = "";
//     if (minutes < 60) {
//       new_date = `${minutes} минут назад`;
//     } else if (hours < 24) {
//       new_date = `${hours} часов назад`;
//     } else {
//       new_date = `${days} дней назад`;
//     }
//     return <Component date={new_date} />;
//   }
//   return Date;
// };

// const DateTimePretty = Data(DateTime);

// function VideoList(props) {
//   return props.list.map((item) => <Video url={item.url} date={item.date} />);
// }

