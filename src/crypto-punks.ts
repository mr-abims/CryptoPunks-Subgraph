import {
  Assign as AssignEvent,
  PunkTransfer as PunkTransferEvent,
  PunkBought as PunkBoughtEvent,
} from "../generated/CryptoPunks/CryptoPunks";

import { Assign, PunkTransfer, PunkBought } from "../generated/schema";

export function handleAssign(event: AssignEvent): void {
  const userAddress = event.params.to.toHexString();
  const punkIndex = event.params.punkIndex.toString();
  const timestamp = event.block.timestamp;
  let user = User.load(userAddress);
  if (!user) {
    user = new User(userAddress);
    user.punkIndexes = [];
    user.save();
  }
  let assign = Assign.load(punkIndex);
  if (!assign) {
    assign = new Assign(punkIndex);
    assign.punk = punkIndex;
    assign.user = userAddress;
    assign.timeStamp = timestamp;
    assign.save();
  }
  let punk = Punk.load(punkIndex);
  if (!punk) {
    punk = new Punk(punkIndex);
    punk.createdAt = timestamp;
    punk.creator = userAddress;
    punk.owner = userAddress;
    punk.save();
  }
}

export function handlePunkTransfer(event: PunkTransferEvent): void {
  const punkIndex = event.params.punkIndex.toString();
  const from = event.params.from.toHexString();
  const to = event.params.to.toHexString();
  const timestamp = event.block.timestamp;
  const hash = event.transaction.hash.toHexString();
  let punk = Punk.load(punkIndex);
  if (!punk) {
    punk = new Punk(punkIndex);
    punk.createdAt = timestamp;
    punk.creator = from;
    punk.owner = to;
    punk.save();
  } else {
    punk.owner = to;
    punk.save();
  }
  let punkTransfer = PunkTransfer.load(punkIndex);
  if (!punkTransfer) {
    punkTransfer = new PunkTransfer(punkIndex);
    punkTransfer.punk = punkIndex;
    punkTransfer.from = from;
    punkTransfer.to = to;
    punkTransfer.timeStamp = timestamp;
    punkTransfer.save();
  }
}

export function handlePunkBought(event: PunkBoughtEvent): void {
  const to = event.params.to.toHexString();
  const from = event.params.from.toHexString();
  const punkIndex = event.params.punkIndex.toString();
  const amount = event.params.value;
  const timestamp = event.block.timestamp;
  const hash = event.transaction.hash.toHexString();
  let PunkBought = new PunkBought(hash);
  PunkBought.punk = punkIndex;
  PunkBought.from = from;
  PunkBought.to = to;
  PunkBought.amount = amount;
  punkBought.timeStamp = timestamp;
  punkBought.save();

  let punk = Punk.load(punkIndex);
  if (!punk) {
    punk = new Punk(punkIndex);
    punk.createdAt = timestamp;
    punk.creator = from;
    punk.owner = to;
    punk.save();
  } else {
    punk.owner = to;
    punk.save();
  }
}
