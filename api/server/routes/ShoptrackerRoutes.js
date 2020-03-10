import { Router } from 'express';
import ShoptrackerController from '../controllers/ShoptrackerController';

const router = Router();

router.get('/', ShoptrackerController.getOpenOrders);
router.get('/:id', ShoptrackerController.getOrderItems);
router.get('/add/:id', ShoptrackerController.addNewOrder);
router.get('/parts/all/', ShoptrackerController.getPartList);
router.get('/part/:id', ShoptrackerController.getPartData);
router.post('/update/part/', ShoptrackerController.updatePart);
router.post('/update/order/', ShoptrackerController.updateOrder);
router.post('/update/orderitem/', ShoptrackerController.updateOrderItem);
router.post('/update/queue/', ShoptrackerController.updateQueue);


//partlist - get
//part/create - post
//part/read - get
//part/update - put
//part/delete - delete
//order/create - post
//order/read - get
//order/update - put
//order/delete - delete
//orderitem/create - post
//orderitem/read - get
//orderitem/update - put
//orderitem/delete - delete
//queue/update - put


// router.delete('/:id', BookController.deleteBook);

export default router;