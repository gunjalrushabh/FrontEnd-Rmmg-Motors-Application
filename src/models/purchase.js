export default class Purchase{
    constructor(userId,bookId,price,purchaseTime,id){
        this.userId=userId;
        this.bookId=bookId;
        this.price=price;
        this.purchaseTime=purchaseTime;
        this.id=id;
    }
}