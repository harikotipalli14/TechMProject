namespace SmartGroceryAPI.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string? Name { get; set; }  // Nullable to avoid initialization error
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
