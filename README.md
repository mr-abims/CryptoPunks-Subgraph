# CryptoPunks Subgraph

[CryptoPunk](https://www.larvalabs.com/cryptopunks) 10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.

##### Contract Address - 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB

This subgraph is developed to  track


##### Punk Ownership
    Address that owns a punk
    Punk transfers
    When a punk sold/bought
    SOLD = Accept Bid
    BOUGHT = Acted on a Punk set for a specific price


##### Punk Sales
    SOLD = Accept Bid
    BOUGHT = Acted on a Punk set for a specific price



#### Events -
    event Assign(address indexed to, uint256 punkIndex);
        - Create an Account Entity from the msg.sender (event.transaction.from)
        - Create an Account Entity from the to (event.params.to)
        - Create a Punk with PunkIndex (Owner will be the TO)
        - AssignedEvent (if we like)


    event PunkTransfer(address indexed from, address indexed to, uint256 punkIndex);
        - Get the current owner of the Punk from the DB (event.params.from)
        - Get the Punk from the DB (event.params.punkIndex)
        - Get or Create the Account Entity from the (event.params.to)
        - Assign the Punk owner to the TO Account
        - Cancel the current bid on the punk if it exists

    event PunkOffered(uint indexed punkIndex, uint minValue, address indexed toAddress);
        - Get the Punk, and set it to forSale, forAddress, set its SalePrice

    event PunkBidEntered(uint indexed punkIndex, uint value, address indexed fromAddress);
        - Get or Create the Account making the bid (event.transaction.from)
        - Get or Create a BidLog() ## BidLog ID - PunkIndex-User

    event PunkBidWithdrawn(uint indexed punkIndex, uint value, address indexed fromAddress);
        - Get BidLog
        - Set it to Cancelled

    event PunkBought(uint indexed punkIndex, uint value, address indexed fromAddress, address indexed toAddress);
        - Get the Punk from the index
        - Get or create an Account off the buyer (to address)
        - Create a SaleLog for that Punk, with value, buyer & timestamp
        - We also want to figure out whether this is a buy from a BID or a Buy from a setting a Punk for sale (either buyPunk, acceptBid)
        - If it comes from a Bid, we need to resolved that BidLog in the database

    event PunkNoLongerForSale(uint indexed punkIndex);
        - Get the Punk
        - We set that it is no longer for sale, perhaps reset the price.
        - We reset who it is for sale to!
