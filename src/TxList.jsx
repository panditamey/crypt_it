export default function TxList({ txs }) {
    if (txs.length === 0) return null;
  
    return (
      <>
        {txs.map((item) => (
          <div key={item} >
            <div className="Tx text-center text-white">
              <label>Transaction Hash:{item.hash}</label>
            </div>
          </div>
        ))}
      </>
    );
  }
  