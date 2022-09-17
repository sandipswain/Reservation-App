import "./maillist.scss";

function MailList() {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailinputContainer">
        <input type="text" placeholder="Your email" className="mailInput" />
        <button className="mailBtn">Subscribe</button>
      </div>
    </div>
  );
}

export default MailList;
