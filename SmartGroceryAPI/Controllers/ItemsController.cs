using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace SmartGroceryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private static List<Item> items = new List<Item>
        {
            new Item { Id = 1, Name = "Milk", Price = 2.5m, Quantity = 10 },
            new Item { Id = 2, Name = "Bread", Price = 1.5m, Quantity = 20 }
        };

        [HttpGet]
        public IActionResult GetItems()
        {
            return Ok(items);
        }

        [HttpPost]
        public IActionResult AddItem([FromBody] Item newItem)
        {
            newItem.Id = items.Count + 1;
            items.Add(newItem);
            return CreatedAtAction(nameof(GetItems), new { id = newItem.Id }, newItem);
        }
    }


    public class Item
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
