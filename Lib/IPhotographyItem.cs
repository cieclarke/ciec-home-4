using cieclarke.Models;

namespace cieclarke.Lib
{
    public interface IPhotographyItem
    {
        string ID { get; set;  }
        PhotographyType Type { get; }
    }
}
