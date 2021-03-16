import * as Fees from '../apis/fees';

export const getTransferFees = async (senderAddress, toAddress, transactionLength) => {
  const fees = await Fees.transferFees(senderAddress, toAddress, transactionLength);
  return fees;
};

export const getTrasactionFees = async (senderAddress, toAddress, amountInBn, tokenSelected) => {
  const fees = await Fees.calculateExtrinsicFees(senderAddress, toAddress, amountInBn, tokenSelected)
  return {totalFee: fees.toString()};
}