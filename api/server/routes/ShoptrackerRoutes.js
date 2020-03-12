import { Router } from 'express';
import ShoptrackerController from '../controllers/ShoptrackerController';

const router = Router();

router.get('/', ShoptrackerController.getOpenOrders);
router.get('/:id', ShoptrackerController.getOrderItems);
router.get('/parts/all/', ShoptrackerController.getPartList);
router.get('/part/:id', ShoptrackerController.getPartData);
router.post('/update/part/', ShoptrackerController.updatePart);
router.post('/update/order/', ShoptrackerController.updateOrder);
router.post('/update/orderitem/', ShoptrackerController.updateOrderItem);
router.post('/update/queue/', ShoptrackerController.updateQueue);

/**
 * * Fishbowl Interaction Routes
 */
router.get('/add/:id', ShoptrackerController.addFishbowlOrder);


/**
 * * Part Routes *
 */
router.get('/partlist/', ShoptrackerController.getPartList);
router.post('/part/create/', ShoptrackerController.createPart);
router.get('/part/read/:id', ShoptrackerController.getPart);
router.put('/part/update/', ShoptrackerController.updatePart);
router.delete('/part/delete/:id', ShoptrackerController.deletePart);

/**
 * * Order Routes *
 */
router.post('/order/create/', ShoptrackerController.createOrder);
router.get('/order/read/:id', ShoptrackerController.getOrder); // id = all or allOpen
router.put('/order/update/', ShoptrackerController.updateOrder);
router.delete('/order/delete/:id', ShoptrackerController.deleteOrder);
router.get('/order/items/:id', ShoptrackerController.getOrderItems)

/**
 * * Order Item Routes *
 */
router.post('/orderitem/create/', ShoptrackerController.createOrderItem);
router.get('/orderitem/read/:id', ShoptrackerController.getOrderItem);
router.put('/orderitem/update/', ShoptrackerController.updateOrderItem);
router.delete('/orderitem/delete/:id', ShoptrackerController.deleteOrderItem);

/**
 * * Queue Routes *
 */
router.put('/queue/update', ShoptrackerController.updateQueue)

// router.delete('/:id', BookController.deleteBook);

export default router;