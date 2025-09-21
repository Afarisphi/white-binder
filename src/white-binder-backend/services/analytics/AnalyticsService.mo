import Array "mo:base/Array";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import WalletScanService "../scanWallet/WalletScanService";

module {

  public type CorrelationEntry = {
    category : Text;
    score : Float;
  };

  public type Transaction = WalletScanService.Transaction;

  public type AnalyticsSummary = {
    totalTransactions : Nat;
    totalVolume : Float;
    highRiskCount : Nat;
    mediumRiskCount : Nat;
    lowRiskCount : Nat;
  };

  public type AnalyticsResult = {
    correlationData : [CorrelationEntry];
    summary : AnalyticsSummary;
  };

  public func getAnalytics(address : Text) : AnalyticsResult {
    let scanResult = WalletScanService.scanWallet(address);

    // Konversi correlationData ke CorrelationEntry
    let correlation : [CorrelationEntry] = Array.map<(Text, Float), CorrelationEntry>(
      scanResult.correlationData,
      func(entry : (Text, Float)) : CorrelationEntry {
        { category = entry.0; score = entry.1 };
      },
    );

    let history = scanResult.history;

    let totalTransactions : Nat = Array.size(history);

    // Hitung total volume
    let totalVolume : Float = Array.foldLeft<Transaction, Float>(
      history,
      0.0,
      func(acc : Float, tx : Transaction) : Float {
        acc + tx.amount;
      },
    );

    // Hitung high risk
    let highRiskCount : Nat = Array.foldLeft<Transaction, Nat>(
      history,
      0,
      func(acc : Nat, tx : Transaction) : Nat {
        if (tx.riskLevel == "High") acc + 1 else acc;
      },
    );

    // Hitung medium risk
    let mediumRiskCount : Nat = Array.foldLeft<Transaction, Nat>(
      history,
      0,
      func(acc : Nat, tx : Transaction) : Nat {
        if (tx.riskLevel == "Medium") acc + 1 else acc;
      },
    );

    // Sisanya dianggap low risk
    let lowRiskCount : Nat = totalTransactions - highRiskCount - mediumRiskCount;

    {
      correlationData = correlation;
      summary = {
        totalTransactions = totalTransactions;
        totalVolume = totalVolume;
        highRiskCount = highRiskCount;
        mediumRiskCount = mediumRiskCount;
        lowRiskCount = lowRiskCount;
      };
    };
  };
};
