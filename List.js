/**===================================================
 * 
 * List.js
 * Ben Reddersen
 * reddersen@wisc.edu
 * Version: 2.1
 *
 * 2.0 changelog:
 * 		Converted to a prototypal pattern from 
 *      the old Pseudoclassical pattern
 * 2.1 changelog:
 * 		Added a pair iterator to List
 * 
 * 2.x roadmap:      
 *		Implement sort()
 *		Implement concat()
 *		Implement indexOf() 
 *		Implement reverse()  		
 *		Implement toString() 
 * 
 *		Add a pair iterator that iterates through 
 *		all pairs of elements in the list    
 * 
 * Description:
 * 		List implements a linked list data structure. 
 * 		The primary advantage of this implementation 
 * 		is that by making use of the included 
 * 		ListIterator class you can add and delete 
 * 		objects in constant time from as you are 
 * 		iterating through the list.
 * 		
 *		It also has good performance if you are 
 *		using it as a stack or queue. Javascript's
 *		dictionary-like objects don't have a natural
 *		ordering, and the built-in array class has 
 *		poor push-pop performance (O(n)). This class
 *		is O(1) for push-pop operations.        
 * 		
 *		This implementation also works with 
 *		javascript's for-each structure. So if A is 
 *		a List object, the following will print all
 *		elements stored in A to the console:
 *		
 *		for(var val in A){
 *			console.log(val);
 *		}          	
 *=================================================*/


/*===========================================
  _     _     _   _   _           _      
 | |   (_)___| |_| \ | | ___   __| | ___ 
 | |   | / __| __|  \| |/ _ \ / _` |/ _ \
 | |___| \__ \ |_| |\  | (_) | (_| |  __/
 |_____|_|___/\__|_| \_|\___/ \__,_|\___|
                                         
===========================================*/

var ListNode = {
	data : null,
	prev : null,
	next : null
}

function newListNode(data, prev, next){
	var newNode = Object.create(ListNode);
	newNode.data = data;
	newNode.prev = prev;
	newNode.next = next;
	return newNode;
}

/*=====================================================================
  _     _     _   ____       _     ___ _                 _             
 | |   (_)___| |_|  _ \ __ _(_)_ _|_ _| |_ ___ _ __ __ _| |_ ___  _ __ 
 | |   | / __| __| |_) / _` | | '__| || __/ _ \ '__/ _` | __/ _ \| '__|
 | |___| \__ \ |_|  __/ (_| | | |  | || ||  __/ | | (_| | || (_) | |   
 |_____|_|___/\__|_|   \__,_|_|_| |___|\__\___|_|  \__,_|\__\___/|_|   
                                                                       
=====================================================================*/

/**
 * ListPairIterator does not return the same element as a pair, so if the 
 * list contains [A, B, C, D], the iterator will return:
 * AB AC AD
 * BC BD
 * CD
 * 
 * The ordering of the items in the tuple returned and the ordering of the 
 * tuples is not guaranteed.       
 *     
 * */
var ListPairIterator = {
	currentNodeA : null,
	currentNodeB : null,
	_List : null,
	
	hasNext : function(){
		return (this.currentNodeB === this._List.tail || this.currentNodeB === null);
	},
	
	next : function() {
		if(this.currentNodeB === this._List.tail || this.currentNodeB === null){
			throw StopIteration;
		}
		var out = {A : this.currentNodeA.data, B : this.currentNodeB.data};
		this.currentNodeB = this.currentNodeB.next;	
		if(this.currentNodeB === this._List.tail){
			this.currentNodeA = this.currentNodeA.next;
			this.currentNodeB = this.currentNodeA.next;
		}
		return out;
	}


}

// 
function newListPairIterator(_List){
	
	var outIter = Object.create(ListPairIterator);
	outIter._List = _List;
	outIter.currentNodeA = outIter._List.head.next;
	outIter.currentNodeB = outIter.currentNodeA.next;
	return outIter;
}

/*======================================================
  _     _     _   ___ _                 _             
 | |   (_)___| |_|_ _| |_ ___ _ __ __ _| |_ ___  _ __ 
 | |   | / __| __|| || __/ _ \ '__/ _` | __/ _ \| '__|
 | |___| \__ \ |_ | || ||  __/ | | (_| | || (_) | |   
 |_____|_|___/\__|___|\__\___|_|  \__,_|\__\___/|_|   
                                                      
======================================================*/



var ListIterator = {
	currentNode : null,
	_List : null,
	
	nodeDeleted : false,
	
	hasNext : function(){
	    
		return (this.currentNode.next !== this._List.tail);
	},
	
	removeCurrent : function(){
		if(this.nodeDeleted){
			throw newUserException("Can't delete the same node twice!");
		}
		this._List.deleteNode(this.currentNode);
		this.nodeDeleted = true;
	},
	
	addAfterCurrent : function(data){
		if(this.nodeDeleted){
			throw newUserException("can't add after a deleted element!");
		}
		this._List.addAfterNode(this.currentNode,data);				
	},
	
	addBeforeCurrent : function(data){
		if(this.nodeDeleted){
			throw newUserException("can't add before a deleted element!");
		}
		this._List.addBeforeNode(this.currentNode,data);	
	},
	
	next : function(){
		if(this.currentNode.next === this._List.tail){
			throw StopIteration;
		} else{
			this.currentNode = this.currentNode.next;
			this.nodeDeleted = false;
			return this.currentNode.data;
		}
	}
	
}

function newListIterator(_List){
	
	var listIter = Object.create(ListIterator);
	listIter.currentNode = _List.head;
	listIter._List = _List;
	
	listIter.nodeDeleted = false;
	
	return listIter;
}


/*==========================
  _     _     _   
 | |   (_)___| |_ 
 | |   | / __| __|
 | |___| \__ \ |_ 
 |_____|_|___/\__|
                  
===========================*/

var List = {
	head : null,
	tail : null,
	size : 0,
		
	pushBack : function(data){
		this.size += 1;
		var newNode = newListNode(data, this.tail.prev, this.tail);
		this.tail.prev.next = newNode;
		this.tail.prev = newNode;		    
	},
	
	popBack : function(){
	    this.size -= 1;
		var retNode = this.tail.prev;
	    if (retNode === this.head){
			return null;
		}
		
		retNode.prev.next = retNode.next;
		retNode.next.prev = retNode.prev;
		
		return retNode.data;
	},
	
	addAfterNode : function(node, data){
		if(node === this.tail){
			throw new RangeError("Can't add new node after tail marker!");
		}
		
		this.size += 1;
		var newNode = newListNode(data, node, node.next);
		node.next.prev = newNode;
		node.next = newNode;
			
	},
	
	addBeforeNode : function(node, data){
		if(node === this.head){
			throw new RangeError("Can't add new node before head marker!");
		}
		
		this.size += 1;
		var newNode = newListNode(data, node.prev, node);
		node.prev.next = newNode;
		node.prev = newNode;
			
	},
	
	pushFront : function(data){
		this.size += 1;
		var newNode = newListNode(data, this.head, this.head.next);
		this.head.next.prev = newNode;
		this.head.next = newNode;		    
	},
	
	popFront : function(){
	    this.size -= 1;
		var retNode = this.head.next;
	    if (retNode === this.tail){
			return null;
		}
		
		retNode.prev.next = retNode.next;
		retNode.next.prev = retNode.prev;
		
		return retNode.data;
	},
	
	deleteNode : function(node){
	
		this.size -= 1;
	    
		if((node !== this.head) && (node !== this.tail)){
			
			node.prev.next = node.next;
			node.next.prev = node.prev;
			
			return node.next;
		} else {
			throw new RangeError("Can't delete marker nodes!");
		}
	},
	
	printList : function(){
		var cNode = this.head.next;
		while(cNode != this.tail){
		   console.log(cNode.data);
		   cNode = cNode.next;
		};
	},
	
	printListBackwards : function(){ // presently slightly broken
		var cNode = this.tail;
		do{
		   console.log(cNode.data);
		   cNode = cNode.prev;
		} while(cNode != this.head);
	},
	
	iterator : function(){
		return newListIterator(this);
	},
	
	pairs : {
		parent : null,
		__iterator__ : function(){
		  return newListPairIterator(this.parent);
		}	
	} 
		
};

// for javascript's built-in for(i in list) structure 
List.__iterator__ = function(){
  return newListIterator(this);
};

function newList(){
	var newL = Object.create(List);
	newL.head = newListNode(null, null, null);
	newL.tail = newListNode(null, newL.head, null);
	
	newL.head.next = newL.tail;
	newL.pairs = {
		parent : newL,
		__iterator__ : function(){
		  return newListPairIterator(this.parent);
		}	
	} 
	return newL;
};

