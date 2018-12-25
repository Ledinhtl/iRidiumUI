var itemList = null;
var itemBuff; //= HomeList;//IR.GetPage("Main page").GetItem("Home").Text.split("\n");

var activitiesList = null;
var activitiesBuff = [];
var activitiesListX = IR.GetPopup("ItemListPlan").X;
var activitiesListY = IR.GetPopup("ItemListPlan").Y;
var activitiesListOffScale = false; 

var innerList = null;
var innerListBuff = [];

var mainTitle = IR.GetPage("Main").GetItem("PageName");
var backPopup = "BackButton";
var diagram = "Diagram";
var SubscriberBuff = []

var centreX = IR.GetPage("Main").Width/2;
var centreY = IR.GetPage("Main").Height/2;

var activitiesListX = IR.GetPopup("ItemListPlan").X;
var activitiesListY = IR.GetPopup("ItemListPlan").Y;

// Global static values
var g_nHexOnePercentOf29  = 255 / 29;
var g_n180PercentOf29     = 180 / 29;                                                    
var g_n180PercentOf100    = 180 / 100;
var g_nHexOnePercentOf100 = 255 / 100;
var g_n234OnePercentOf30  = 234 / 30;
var g_n234PercentOf100    = 234 / 100;
var g_n100PercentOf30     = 100 / 30;


/**
  * Get project width and height
  * if width more than height then it is tablet
  * else it is phone
*/

IR.AddListener(IR.EVENT_START, 0, function()
{  
   IR.ShowPopup(diagram)
   itemBuff = EquipmentList;
   mainTitle.Text = "Home";

   itemList = IR.GetPopup("Menu").GetItem("ItemList");
   activitiesList = IR.GetPopup("ItemListPlan").GetItem("ItemList"); 
   innerList = IR.GetPopup("InnerItemListPlan").GetItem("ItemList");
  
   FillRooms(); 
});

function FillRooms()
{  
   itemList.Clear();
   
   for (var i = 0; i <= itemBuff.length - 1; i++)
   {
     if (itemBuff[i].length > 0)
     {
       itemList.AddPopup(itemBuff[i]);
     }  
   }
     
   IR.ShowPopup(itemList.Parent.Name);
}

function ItemClick()
{
   var itemName = this.Name;
   var compareBuff = Activities[this.Name];
   
   if (compareBuff != activitiesBuff)
   {
      ResetActivity();
      OpenActivity(itemName);
      
   }
   else
   {
      activitiesList.SetPosition(0)
      ResetActivity();
   }
}

function InnerMenuClick()
{
   var popupName = this.Parent.Name;

   SetInnerListPosition(popupName);
   ResetActivity();
}

function ResetActivity()
{                                                       
   var moveDisX = activitiesListX - IR.GetPopup("ItemListPlan").X;
   var moveDisY = activitiesListY - IR.GetPopup("ItemListPlan").Y;

   ANIMATION(
		[ANIMATION.MoveHorizontal(IR.GetPopup("Diagram").X, moveDisX) , ANIMATION.MoveVertical(IR.GetPopup("Diagram").Y, moveDisY), ANIMATION.ScaleXY(1, 0)], 
		[IR.GetPopup("Diagram")], 
		600, 
		ANIMATION.NO_DELAY, 
		ANIMATION.NO_LOOP, 
		IR.SINE_OUT
	); 
   
	ANIMATION(
		[ANIMATION.MoveHorizontal(IR.GetPopup("ItemListPlan").X, moveDisX) , ANIMATION.MoveVertical(IR.GetPopup("ItemListPlan").Y, moveDisY), ANIMATION.ScaleXY(1, 0)], 
		[IR.GetPopup("ItemListPlan")], 
		600, 
		ANIMATION.NO_DELAY, 
		ANIMATION.NO_LOOP, 
		IR.SINE_OUT
	);
   /*if(activitiesListOffScale = true)
   {
      ZoomOut();
   }*/
}

function OpenActivity(itemName)
{
   activitiesBuff = Activities[itemName];
   activitiesList.SetPosition(0);
   activitiesList.Clear();
  
   innerListBuff= InnerMenu[itemName];
   innerList.SetPosition(0);
   innerList.Clear();
  
   for (var i = 0; i <= activitiesBuff.length - 1; i++)
   {
      activitiesList.AddPopup(activitiesBuff[i]);
   }
   
   for (var i = 0; i <= innerListBuff.length - 1; i++)
   {
      innerList.AddPopup(innerListBuff[i]);
   } 
  
   IR.ShowPopup(activitiesList.Parent.Name);
   IR.ShowPopup(innerList.Parent.Name);
   mainTitle.Text = itemName;
   IR.ShowPopup("Menu"  );
   IR.ShowPopup(backPopup);
}
  
function SetInnerListPosition(popupName)
{
   var listPos;
   for (var i = 0; i < innerListBuff.length; i++)
   {
      if(popupName == innerListBuff[i])
      {
         listPos = i;
      }
   }
   activitiesList.SetPosition(listPos);
}                                                                                      

function OpenRoomsPopup()
{
   IR.HidePopup(this.Parent.Name);
   IR.ShowPopup(g_oRoomsList.Parent.Name);
   MainTitle.Text = "Home";
}

function ZoomIn()
{
   ANIMATION(
		[ANIMATION.ScaleXY(1, 0.5)], 
		[IR.GetPopup("Diagram")], 
		600, 
		ANIMATION.NO_DELAY, 
		ANIMATION.NO_LOOP, 
		IR.SINE_OUT
	);
      
   ANIMATION(
		[ANIMATION.ScaleXY(1, 0.5)], 
		[IR.GetPopup("ItemListPlan")], 
		600, 
		ANIMATION.NO_DELAY, 
		ANIMATION.NO_LOOP, 
		IR.SINE_OUT
	); 
   activitiesListOffScale = true;
}

function ZoomOut()
{
   ANIMATION(                   
		[ANIMATION.ScaleXY(1, 0.5)], 
		[IR.GetPopup("Diagram")], 
		600, 
		ANIMATION.NO_DELAY, 
		ANIMATION.NO_LOOP, 
		IR.SINE_IN
	);
      
   ANIMATION(
		[ANIMATION.ScaleXY(1, 0.5)], 
		[IR.GetPopup("ItemListPlan")], 
		600, 
		ANIMATION.NO_DELAY, 
		ANIMATION.NO_LOOP, 
		IR.SINE_IN
	); 
   activitiesListOffScale = false;
}

function MoveToNode()
{
   var nodeCentreX = this.X + this.Width/2;
   var nodeCentreY = this.Y + this.Height/2;
   
   var nodeGlobalCentreX = nodeCentreX+ this.Parent.X + IR.GetPopup("ItemListPlan").X;
   var nodeGlobalCentreY = nodeCentreY+ this.Parent.X + IR.GetPopup("ItemListPlan").Y;
   
   var moveDisX = centreX - nodeGlobalCentreX;
   var moveDisY = centreY - nodeGlobalCentreY;

   
	ANIMATION(
		[ANIMATION.MoveHorizontal(IR.GetPopup("Diagram").X, moveDisX) , ANIMATION.MoveVertical(IR.GetPopup("Diagram").Y, moveDisY), ANIMATION.ScaleXY(1, 0)], 
		[IR.GetPopup("Diagram")], 
		600, 
		ANIMATION.NO_DELAY, 
		ANIMATION.NO_LOOP, 
		IR.SINE_IN
	); 
   
	ANIMATION(
		[ANIMATION.MoveHorizontal(IR.GetPopup("ItemListPlan").X, moveDisX) , ANIMATION.MoveVertical(IR.GetPopup("ItemListPlan").Y, moveDisY), ANIMATION.ScaleXY(1, 0)], 
		[IR.GetPopup("ItemListPlan")], 
		600, 
		ANIMATION.NO_DELAY, 
		ANIMATION.NO_LOOP, 
		IR.SINE_IN
	); 
   
   /*if(activitiesListOffScale = false)
   {
      ZoomIn();
   }*/
}

RGB_player(
         "Modbus RTU",                                            // Driver in project
         "Red",                                       // Name of Red Channel
         "Green",                                     // Name of Green Channel 
         "Blue",                                      // Name of Blue Channel
         255,                                                 // Top limit for RGB channel (100 or 255)
         IR.GetPopup("BasicLightControl").GetItem("joystick color picker circle max360x512 596x379"), // Item "Color Picker"
         /////// optional parameters ////////////////////////////
         IR.GetPopup("BasicLightControl").GetItem("1 Light active 88x88 2"),      // Item "Display"
         IR.GetPopup("BasicLightControl").GetItem("Arrows up 88x88 8 00"),                // Item "Up"
         IR.GetPopup("BasicLightControl").GetItem("Arrows down 88x88 i 00"),              // Item "Down"
         10                                                   // Increment step for "Up" and "Down"
         )
