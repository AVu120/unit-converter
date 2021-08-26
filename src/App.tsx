import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <h1>Unit Converter</h1>
      <div className={styles.grid}>
        <div className={styles.input}>
          <input />
          <label>Meter</label>
        </div>
        <div className={styles.input}>
          <input />
          Centimeter
        </div>
        <div className={styles.input}>
          <input />
          <label>Kilogram</label>
        </div>
        <div className={styles.input}>
          <input />
          <label>Gram</label>
        </div>
      </div>
    </div>
  );
}

export default App;
